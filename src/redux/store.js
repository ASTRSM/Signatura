import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './slices/apiSlice';
import {userSlice} from './slices/userSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};
