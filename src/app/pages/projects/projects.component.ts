import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project, Task } from 'src/app/interfaces';
import { ProjectService } from 'src/app/state/effects/projects.effect';
import { projects } from 'src/app/state/selectors/projects.selector';
import { tasks } from 'src/app/state/selectors/tasks.selector';
import { TasksService } from 'src/app/state/effects/tasks.effect';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[] | null>;
  tasks: Task[] | null = [];
  constructor(
    private projectService: ProjectService,
    private tasksService: TasksService,
    private store: Store
  ) {
    this.projects$ = this.store.select(projects);
    this.store.select(tasks).subscribe((tasks) => (this.tasks = tasks));
  }
  fetchProjects = () => this.projectService.fetchProjects();
  fetchTasks = () => this.tasksService.fetchTasks();
  ngOnInit() {
    this.fetchProjects();
    this.fetchTasks();
  }
  ngOnUpdate() {
    this.fetchProjects();
    this.fetchTasks();
  }
  getTasksForProject(projectId: number): Task[] {
    return this.tasks
      ? this.tasks?.filter((task) => task.projectId === projectId)
      : [];
  }
}
