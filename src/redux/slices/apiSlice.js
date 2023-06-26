import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import supabase from '../../helper/supabaseInit';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
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
          const {data: userData, error: profileError} = await supabase
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
          return {data: userData, error: profileError};
        }

        return {data, error};
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
  }),
});

export const {useSignUpMutation, useSignInMutation} = apiSlice;
