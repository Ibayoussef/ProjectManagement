import { Component, Input } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/state/effects/projects.effect';
import { AuthService } from 'src/app/state/effects/user.effect';
import { TasksService } from 'src/app/state/effects/tasks.effect';
import { selectUsers } from 'src/app/state/selectors/user.selector';
import { projects } from 'src/app/state/selectors/projects.selector';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() ticket: boolean = false;
  users$: Observable<any | null>;
  projects$: Observable<any | null>;
  constructor(
    private projectServices: ProjectService,
    private tasksService: TasksService,
    private authService: AuthService,
    private store: Store
  ) {
    this.projectServices.fetchProjects();
    this.authService.fetchUsers();
    this.users$ = this.store.select(selectUsers);
    this.projects$ = this.store.select(projects);
  }

  projectData: { name: string; description: string } = {
    name: '',
    description: '',
  };
  taskData: any = {
    title: '',
    description: '',
    projectId: 0,
    assignee: '',
    priority: '',
    taskType: '',
  };
  @Input() data: any = {};
  @Input() handleModal: any = () => null;
  faClose = faClose;
  fetchProjects = () => this.projectServices.fetchProjects();
  fetchTasks = () => this.tasksService.fetchTasks();
  handleCreate = () => {
    this.projectServices.createProject(
      this.projectData.name,
      this.projectData.description
    );
    this.fetchProjects();
    this.handleModal();
  };
  handleCreateTicket = () => {
    this.tasksService.createTask({
      ...this.taskData,
      projectId: parseInt(this.taskData.projectId),
    });
    this.fetchTasks();
    this.handleModal();
  };
}
