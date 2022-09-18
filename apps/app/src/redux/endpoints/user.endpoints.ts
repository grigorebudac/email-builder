import { RootApi } from '@/redux/apis/root.api';

export const UserEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCurrentUser: builder.query<unknown, void>({
      query: () => ({
        url: `/me`,
      }),
    }),
  }),
});

export const { useLazyGetCurrentUserQuery } = UserEndpoints;
