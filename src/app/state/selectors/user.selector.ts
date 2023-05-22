import { createSelector, createFeatureSelector } from '@ngrx/store';

const selectUser = createFeatureSelector<{ token: string | null; users: any }>(
  'user'
);
export const selectToken = createSelector(selectUser, (state) => state.token);
export const selectUsers = createSelector(selectUser, (state) => state.users);
