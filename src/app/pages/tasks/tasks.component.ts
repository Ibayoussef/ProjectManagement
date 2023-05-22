import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TasksService } from 'src/app/state/effects/tasks.effect';
import { tasks } from 'src/app/state/selectors/tasks.selector';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  tasks$: Observable<any | null>;
  constructor(private tasksService: TasksService, private store: Store) {
    this.tasks$ = this.store.select(tasks);
  }
  fetchTasks = () => this.tasksService.fetchTasks();
  ngOnInit() {
    this.fetchTasks();
  }
  ngOnUpdate() {
    this.fetchTasks();
  }
}
