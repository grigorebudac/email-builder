import { RootApi, USER_TAG } from '@/redux/apis/root.api';

export const AuthenticationEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    register: builder.mutation<unknown, unknown>({
      query: (body) => ({
        url: `/auth/register`,
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<string, { email: string, password: string }>({
      query: (body) => ({
        url: `/auth/login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [USER_TAG],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } =
  AuthenticationEndpoints;
