import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Task } from 'src/app/interfaces';

const selectTasks = createFeatureSelector<{
  tasks: Task[] | null;
  task: Task | Object;
  errors: any | null;
}>('tasks');
export const tasks = createSelector(selectTasks, (state) => state.tasks);
export const task = createSelector(selectTasks, (state) => state.task);
export const errors = createSelector(selectTasks, (state) => state.errors);
