import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@prisma/client';

type UserState = {
  user: Pick<User, 'id'> | null;
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
      state.user = null;
    },
  },
});

export const { setUser, logout } = slice.actions;

export default slice.reducer;
