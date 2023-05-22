import { Component, Input } from '@angular/core';
import {
  CardSettingsModel,
  DataSourceChangedEventArgs,
} from '@syncfusion/ej2-angular-kanban';
import { TasksService } from 'src/app/state/effects/tasks.effect';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

@Component({
  selector: 'app-kanbanboard',
  templateUrl: './kanbanboard.component.html',
  styleUrls: ['./kanbanboard.component.scss'],
})
export class KanbanboardComponent {
  @Input() data: Object[] = [];
  constructor(private tasksService: TasksService) {}
  public cardSettings: CardSettingsModel = {
    contentField: 'summary',
    headerField: 'title',
    tagsField: 'tags',
    grabberField: 'color',
    footerCssField: 'classname',
  };

  public dataSourceChanged(state: DataSourceChangedEventArgs): void {
    console.log(state);
    if (state && state.requestType === 'cardChanged') {
      this.tasksService.updateTask(state?.changedRecords?.[0]?.['id'], {
        summary: state.changedRecords?.[0]?.['summary'],
        status: state.changedRecords?.[0]?.['status'],
      });
    }
    if (state && state.requestType === 'cardRemoved') {
      this.tasksService.removeTask(state?.deletedRecords?.[0]?.['id']);
    }
  }
}
