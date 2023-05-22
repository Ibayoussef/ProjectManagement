import { createReducer, on } from '@ngrx/store';
import {
  fetchFailure,
  fetchTasksSuccess,
  fetchTaskSuccess,
  filterTaskSuccess,
} from '../actions/tasks.actions';
import { Task } from 'src/app/interfaces';
export const initialState: {
  tasks: Task[] | null;
  errors: any | null;
  task: Task | null;
} = {
  tasks: [],
  task: null,
  errors: '',
};

export const tasksReducer = createReducer(
  initialState,
  on(fetchFailure, (state, { errors }) => ({ ...state, errors })),
  on(fetchTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
  })),
  on(filterTaskSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
  })),

  on(fetchTaskSuccess, (state, { task }) => ({ ...state, task: task }))
);
