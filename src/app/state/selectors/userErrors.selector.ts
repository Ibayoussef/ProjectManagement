import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<{ errors: any | null }>(
  'user'
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.errors
);
