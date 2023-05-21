import { createReducer, on } from '@ngrx/store';
import {
  fetchProjectSuccess,
  fetchProjectsSuccess,
  fetchFailure,
} from '../actions/projects.actions';
import { Project } from 'src/app/interfaces';
export const initialState: {
  projects: Project[] | null;
  errors: any | null;
  project: Project | Object;
} = {
  projects: [],
  project: {},
  errors: '',
};

export const projectsReducer = createReducer(
  initialState,
  on(fetchFailure, (state, { errors }) => ({ ...state, errors })),
  on(fetchProjectsSuccess, (state, { projects }) => ({
    ...state,
    projects: projects,
  })),
  on(fetchProjectSuccess, (state, { project }) => ({ ...state, project }))
);
