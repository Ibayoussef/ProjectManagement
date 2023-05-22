import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TasksService } from 'src/app/state/effects/tasks.effect';
import { tasks } from 'src/app/state/selectors/tasks.selector';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  tasks$: Observable<any | null>;
  kanbanData: any = [];
  constructor(private tasksService: TasksService, private store: Store) {
    this.tasks$ = this.store.select(tasks);
    this.store.select(tasks).subscribe((data) => {
      this.kanbanData = JSON.parse(JSON.stringify(data)).map((e: any) => {
        return {
          ...e,
          classname: `e-${e?.priority?.toLowerCase()}, e-${e?.type?.toLowerCase()}`,
        };
      });
    });
  }
  fetchTasks = () => this.tasksService.fetchTasks();
  ngOnInit() {
    this.fetchTasks();
  }
  ngOnUpdate() {}
}
