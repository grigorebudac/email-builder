import { RootApi } from '@/redux/apis/root.api';

export const AuthenticationEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    register: builder.mutation<unknown, unknown>({
      query: (body) => ({
        url: `/register`,
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<unknown, unknown>({
      query: (body) => ({
        url: `/login`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } =
  AuthenticationEndpoints;
