import { RootApi } from '@/redux/apis/root.api';
import { User } from '@prisma/client';

export const UserEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: `users/me`,
      }),
    }),
  }),
});

export const { useLazyGetCurrentUserQuery } = UserEndpoints;
