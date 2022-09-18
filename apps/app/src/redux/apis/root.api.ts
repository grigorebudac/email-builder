import { createApi } from '@reduxjs/toolkit/query/react';
import { rootApiBaseQuery } from '@/utils/redux.utils';

export const USER_TAG = 'USER';
export const TEMPLATE_TAG = 'TEMPLATE';

export const RootApi = createApi({
  reducerPath: 'RootApi',
  baseQuery: rootApiBaseQuery,
  tagTypes: [USER_TAG, TEMPLATE_TAG],
  endpoints: () => ({}),
});
