import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const rootApiBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_ROOT_API_ENDPOINT}`,
  prepareHeaders: async (headers) => {
    const token = '';

    if (token != null) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
