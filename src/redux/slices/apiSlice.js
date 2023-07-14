import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import {decode} from 'base64-arraybuffer';
import supabase from '../../helper/supabaseInit';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['image', 'signatures', 'users'],
  endpoints: builder => ({
    signUp: builder.mutation({
      queryFn: async ({
        email,
        password,
        name,
        birthday,
        institution,
        description,
      }) => {
        const {data, error} = await supabase.auth.signUp({
          email,
          password,
        });

        if (!error) {
          const {data: dataUser, error: errorUser} = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email,
              name,
              birthday,
              institution,
              description,
              updated_at: new Date(),
            })
            .single();

          return {data: dataUser, error: errorUser};
        }

        return {data: data.session, error: error[0]};
      },
    }),
    signIn: builder.mutation({
      queryFn: async ({email, password}) => {
        const {data, error} = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        return {data, error};
      },
    }),
    signOut: builder.mutation({
      queryFn: async () => {
        const {data, error} = await supabase.auth.signOut();

        return {data, error};
      },
    }),
    getUsers: builder.query({
      queryFn: async ({keyword = '', id = ''}) => {
        const {data, error} = await supabase
          .from('users')
          .select()
          .neq('id', id)
          .ilike('name', `%${keyword}%`);

        return {data, error};
      },
      providesTags: (result = []) => [
        'users',
        ...result?.map(({id}) => ({type: 'users', id})),
      ],
    }),
    getUser: builder.query({
      queryFn: async id => {
        const {data, error} = await supabase
          .from('users')
          .select()
          .eq('id', id)
          .single();

        return {data, error};
      },
      providesTags: (result = [], error, id) => [
        {
          type: 'users',
          id,
        },
      ],
    }),
    editUser: builder.mutation({
      queryFn: async ({id, name, birthday, institution, description}) => {
        const {error} = await supabase
          .from('users')
          .update({
            name,
            birthday,
            institution,
            description,
            updated_at: new Date(),
          })
          .eq('id', id);

        return {data: null, error};
      },
      invalidatesTags: (result = [], error, {id}) => [{type: 'users', id}],
    }),
    addSignature: builder.mutation({
      queryFn: async ({noDocument, title, description, requestee, signee}) => {
        const {data, error} = await supabase
          .from('signatures')
          .insert({
            no_document: noDocument,
            title,
            description,
            requestee_id: requestee,
            signee_id: signee,
            updated_at: new Date(),
          })
          .single();

        return {data, error};
      },
      invalidatesTags: ['signatures'],
    }),
    getSignatures: builder.query({
      queryFn: async ({search, sort, status, id, page}) => {
        const query = supabase
          .from('signature_view')
          .select()
          .or(
            `title.ilike.%${search}%,requestee_name.ilike.%${search}%,signee_name.ilike.%${search}%`,
          )
          .in('status', status ? [status] : ['pending', 'done', 'rejected']);

        if (page === 'request') {
          query.eq('requestee_id', id);
        } else {
          query.eq('signee_id', id);
        }

        if (sort === 'date') {
          query.order('updated_at', {ascending: true});
        } else if (sort === 'name' && page === 'request') {
          query.order('signee_name', {ascending: false});
        } else if (sort === 'name' && page === 'sign') {
          query.order('requestee_name', {ascending: false});
        } else {
          query.order('updated_at', {ascending: false});
        }

        const {data, error} = await query;

        return {data, error};
      },
      providesTags: (result = []) => [
        'signatures',
        ...result?.map(({id}) => ({type: 'signatures', id})),
      ],
    }),
    getSignature: builder.query({
      queryFn: async id => {
        const {data, error} = await supabase
          .from('signature_view')
          .select()
          .eq('id', id)
          .single();

        return {data, error};
      },
      providesTags: (result = [], error, id) => [
        {
          type: 'signatures',
          id,
        },
      ],
    }),
    approveSignature: builder.mutation({
      queryFn: async ({id}) => {
        const {error} = await supabase
          .from('signatures')
          .update({
            status: 'done',
            updated_at: new Date(),
          })
          .eq('id', id);

        return {data: null, error};
      },
      invalidatesTags: (result = [], error, {id}) => [{type: 'signatures', id}],
    }),
    rejectSignature: builder.mutation({
      queryFn: async ({id, message}) => {
        const {error} = await supabase
          .from('signatures')
          .update({
            status: 'rejected',
            updated_at: new Date(),
            message,
          })
          .eq('id', id);

        return {data: null, error};
      },
      invalidatesTags: (result = [], error, {id}) => [{type: 'signatures', id}],
    }),
    getDashboard: builder.query({
      queryFn: async id => {
        const {data, error} = await supabase
          .rpc('dashboard', {
            p_id: id,
          })
          .single();

        if (!error) {
          const {data: signatures, error: errorSignatures} = await supabase
            .from('signature_view')
            .select()
            .or(`requestee_id.eq.${id},signee_id.eq.${id}`)
            .order('updated_at', {ascending: false})
            .limit(3);

          data.signatures = signatures;

          return {data, error: errorSignatures};
        }

        return {data, error};
      },
      providesTags: ['signatures'],
    }),
    addImage: builder.mutation({
      queryFn: async ({id, base64}) => {
        const {data, error} = await supabase.storage
          .from('signatures')
          .upload(`image/${id}.png`, decode(base64), {
            upsert: true,
          });

        return {data, error};
      },
      invalidatesTags: ['image'],
    }),
    getImage: builder.query({
      queryFn: async id => {
        const {data, error} = await supabase.storage
          .from('signatures')
          .list('image', {
            limit: 1,
            offset: 0,
            search: `${id}.png`,
          });

        if (Object.keys(data).length === 0) {
          return {data: null, error};
        }

        if (!error) {
          const {data: image, error: errorImage} = await supabase.storage
            .from('signatures')
            .getPublicUrl(`image/${id}.png`);

          return {data: image, error: errorImage};
        }

        return {data, error};
      },
      providesTags: ['image'],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useEditUserMutation,
  useAddSignatureMutation,
  useGetSignaturesQuery,
  useGetSignatureQuery,
  useApproveSignatureMutation,
  useRejectSignatureMutation,
  useGetDashboardQuery,
  useAddImageMutation,
  useGetImageQuery,
} = apiSlice;
