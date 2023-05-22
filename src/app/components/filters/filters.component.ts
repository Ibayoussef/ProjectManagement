import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TasksService } from 'src/app/state/effects/tasks.effect';
import { AuthService } from 'src/app/state/effects/user.effect';
import { selectUsers } from 'src/app/state/selectors/user.selector';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  users$: Observable<any | null>;
  faSearch = faSearch;
  openModal = false;
  ticket = true;
  filters: any = {
    query: '',
    status: '',
    assignee: '',
  };
  onSearchChange(): void {
    this.tasksService.filterTask({
      query: this.filters.query,
      status: this.filters.status,
      assignee: this.filters.assignee,
    });
  }
  resetFilters() {
    this.filters = {
      query: '',
      status: '',
      assignee: '',
    };
    this.tasksService.filterTask({
      query: '',
      status: '',
      assignee: '',
    });
  }
  constructor(
    private authService: AuthService,
    private tasksService: TasksService,
    private store: Store
  ) {
    this.authService.fetchUsers();
    this.users$ = this.store.select(selectUsers);
  }
  handleModal = () => (this.openModal = !this.openModal);
}
