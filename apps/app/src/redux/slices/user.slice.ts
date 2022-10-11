import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@prisma/client';
import { LOCAL_STORAGE } from '@/config/constants';

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['user'] | undefined>) => {
      state.user = action.payload || null;
    },
    logout: (state) => {
      localStorage.removeItem(LOCAL_STORAGE.TOKEN);
      state.user = null;
    }
  },
});

export const { setUser, logout } = slice.actions;

export default slice.reducer;
