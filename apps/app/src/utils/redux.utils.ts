import { LOCAL_STORAGE } from '@/config/constants';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const rootApiBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_ROOT_API_ENDPOINT}`,
  prepareHeaders: async (headers, { getState }) => {
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN)

    if (token != null) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
