import { createSelector } from '@reduxjs/toolkit';

import type { AppState } from '@/types/store.types';

const appSelector = (state: AppState) => state.user;

export const user = createSelector(appSelector, (state) => state.user!);

export const isAuthenticated = createSelector(
  appSelector,
  (state) => state.user != null
);
