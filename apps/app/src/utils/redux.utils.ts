import { LOCAL_STORAGE } from '@/config/constants';
import { logout } from '@/redux/slices/user.slice';
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const rootApiBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_ROOT_API_ENDPOINT}`,
  prepareHeaders: async (headers, { getState }) => {
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN)

    if (token != null) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await rootApiBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
};
