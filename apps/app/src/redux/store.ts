import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/user.slice';

import { RootApi } from './apis/root.api';

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      [RootApi.reducerPath]: RootApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(RootApi.middleware),
  });
}

const store = makeStore();

export default store;
