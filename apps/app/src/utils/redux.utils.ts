import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const rootApiBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_ROOT_API_ENDPOINT}`,
  prepareHeaders: async (headers) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzI1ZjJlZDM0OTFkZDQ0M2NhMGEwNjkiLCJpYXQiOjE2NjUxNTk5OTgsImV4cCI6MTY5NjcxNzU5OH0.-Fvw5ASQn_dQe2vdzLqzUjboTBC2izZC6Yi7S-r6Ebk';

    if (token != null) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
