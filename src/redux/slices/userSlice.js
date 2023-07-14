import supabase from '../../helper/supabaseInit';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

export const getUser = createAsyncThunk(
  'user/getUser',
  async (id, {rejectWithValue}) => {
    const {data, error} = await supabase.from('users').select().eq('id', id);
    if (error) {
      return rejectWithValue(error);
    }
    return data;
  },
);

export const editUser = createAsyncThunk(
  'user/editUser',
  async ({id, name, birthday, institution, description}, {rejectWithValue}) => {
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

    if (error) {
      return rejectWithValue(error);
    }

    const {data} = await supabase.from('users').select().eq('id', id);

    return data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        return action.payload[0];
      })
      .addCase(editUser.fulfilled, (state, action) => {
        return action.payload[0];
      });
  },
});
