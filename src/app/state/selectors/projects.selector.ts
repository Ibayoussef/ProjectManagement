import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Project } from 'src/app/interfaces';

const selectProjects = createFeatureSelector<{
  projects: Project[] | null;
  project: Project | Object;
  errors: any | null;
}>('projects');
export const projects = createSelector(
  selectProjects,
  (state) => state.projects
);
export const project = createSelector(selectProjects, (state) => state.project);
export const errors = createSelector(selectProjects, (state) => state.errors);
