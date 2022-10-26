import { RootApi, USER_TAG } from '@/redux/apis/root.api';
import { Auth } from '../../types/auth.types';

export const AuthenticationEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    register: builder.mutation<Auth.RegisterResponse, Auth.RegisterRequestPayload>({
      query: (body) => ({
        url: `/auth/register`,
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<Auth.LoginRespose, Auth.LoginRequestPayload>({
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
