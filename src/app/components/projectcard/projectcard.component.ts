import { Component, Input } from '@angular/core';
import { Project, Task } from 'src/app/interfaces';
import { ProjectService } from 'src/app/state/effects/projects.effect';

@Component({
  selector: 'app-projectcard',
  templateUrl: './projectcard.component.html',
  styleUrls: ['./projectcard.component.scss'],
})
export class ProjectcardComponent {
  @Input() project: Project = {} as Project;
  @Input() tasks: Task[] = [];
  toDoTasks: number = 0;
  inProgTasks: number = 0;
  testingTasks: number = 0;
  doneTasks: number = 0;
  constructor(private projectServices: ProjectService) {}
  ngOnChanges() {
    this.toDoTasks = this.tasks.filter((task) => task.status === 'ToDo').length;
    this.inProgTasks = this.tasks.filter(
      (task) => task.status === 'In Progress'
    ).length;
    this.testingTasks = this.tasks.filter(
      (task) => task.status === 'Testing'
    ).length;
    this.doneTasks = this.tasks.filter(
      (task) => task.status === 'Close'
    ).length;
  }
  deleteProject = () => {
    this.projectServices.deleteProject(this.project.id);
  };
}
