import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/utils/redux.utils';

export const USER_TAG = 'USER';
export const TEMPLATE_TAG = 'TEMPLATE';

export const RootApi = createApi({
  reducerPath: 'RootApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [USER_TAG, TEMPLATE_TAG],
  endpoints: () => ({}),
});
