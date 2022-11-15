import { Auth } from '@aws-amplify/auth';
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

const rootApiBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_ROOT_API_ENDPOINT}`,
  prepareHeaders: async (headers) => {
    const currentSession = await Auth.currentSession();
    const token = currentSession.getIdToken().getJwtToken();

    if (token != null) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rootApiBaseQuery(args, api, extraOptions);
  return result;
};
