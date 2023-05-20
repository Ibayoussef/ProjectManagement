import { createSelector, createFeatureSelector } from '@ngrx/store';

const selectUser = createFeatureSelector<{ token: string | null }>('user');
export const selectToken = createSelector(selectUser, (state) => state.token);
