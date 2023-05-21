import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProjectHttpService {
  constructor(private http: HttpClient) {}

  projectsService() {
    return this.http.get<{ $values: any }>(
      'https://localhost:7187/api/Projects'
    );
  }
  projectService(id: number) {
    return this.http.get<{ project: Project }>(
      `https://localhost:7187/api/Projects/${id}`
    );
  }
}
