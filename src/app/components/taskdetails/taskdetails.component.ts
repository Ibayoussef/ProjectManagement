import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/interfaces';
import { TasksService } from 'src/app/state/effects/tasks.effect';
import { AuthService } from 'src/app/state/effects/user.effect';
import { task } from 'src/app/state/selectors/tasks.selector';
import { selectUsers } from 'src/app/state/selectors/user.selector';

@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.scss'],
})
export class TaskdetailsComponent {
  users$: Observable<any | null>;
  private _tasks = new BehaviorSubject<Task[]>([]);
  taskId = 0;
  assigneeValue = 'Andrews';
  priorityValue = 'high';
  typeValue = 'task';
  @Input()
  set tasks(value: Task[]) {
    this._tasks.next(value);
  }

  task$: Observable<any>;

  constructor(
    private authService: AuthService,
    private taskService: TasksService,
    private store: Store
  ) {
    this.authService.fetchUsers();
    this.users$ = this.store.select(selectUsers);
    this.task$ = combineLatest([
      this.store.select(task),
      this._tasks.asObservable(),
    ]).pipe(map(([selectedTask, tasks]) => selectedTask ?? tasks[0]));
    this.task$.subscribe((selectedTask) => {
      if (selectedTask) {
        this.assigneeValue = selectedTask.assignee;
        this.typeValue = selectedTask.type;
        this.priorityValue = selectedTask.priority;
        this.taskId = selectedTask.id;
      }
    });
  }
  editAssignee = () => {
    this.taskService.updateTask(this.taskId, { assignee: this.assigneeValue });
  };
  editType = () => {
    this.taskService.updateTask(this.taskId, { type: this.typeValue });
  };
  editPrio = () => {
    this.taskService.updateTask(this.taskId, { priority: this.priorityValue });
  };
}
