import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../interfaces';
import { Store } from '@ngrx/store';
import { selectToken } from '../state/selectors/user.selector';
import { Observable, exhaustMap, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProjectHttpService {
  constructor(private http: HttpClient, private store: Store) {}

  projectsService() {
    return this.http.get<{ $values: any }>(
      'http://localhost:5071/api/Projects'
    );
  }
  searchProjectsService(search: string) {
    return this.http.get<{ $values: any }>(
      `http://localhost:5071/api/Projects?name=${search}`
    );
  }
  projectService(id: number) {
    return this.http.get<{ project: Project }>(
      `http://localhost:5071/api/Projects/${id}`
    );
  }
  createProjectService(name: string, description: string) {
    return this.http.post(`http://localhost:5071/api/Projects`, {
      name: name,
      description: description,
    });
  }
  deleteProjectService(id: number) {
    return this.http.delete(`http://localhost:5071/api/Projects/${id}`);
  }
}
