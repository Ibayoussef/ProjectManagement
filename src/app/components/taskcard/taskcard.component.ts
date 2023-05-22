import { Component, Input } from '@angular/core';
import { Task } from 'src/app/interfaces';
import { TasksService } from 'src/app/state/effects/tasks.effect';

@Component({
  selector: 'app-taskcard',
  templateUrl: './taskcard.component.html',
  styleUrls: ['./taskcard.component.scss'],
})
export class TaskcardComponent {
  @Input() tasks: Task[] = [];
  constructor(private tasksService: TasksService) {}
  fetchTask = (id: number) => {
    this.tasksService.fetchTask(id);
  };
}
