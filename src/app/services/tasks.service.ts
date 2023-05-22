import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TasksHttpService {
  constructor(private http: HttpClient) {}

  tasksService() {
    return this.http.get<{ $values: any }>('http://localhost:5071/api/Tickets');
  }
  taskService(id: number) {
    return this.http.get<{ task: Task }>(
      `http://localhost:5071/api/Tickets/${id}`
    );
  }
  updateTaskService(
    id: number,
    data: {
      title?: string;
      description?: string;
      status?: string;
      assignee?: string;
      type?: string;
      priority?: string;
    }
  ) {
    return this.http.put(`http://localhost:5071/api/Tickets/${id}`, data);
  }
  removeTaskService(id: number) {
    return this.http.delete(`http://localhost:5071/api/Tickets/${id}`);
  }
  filterTasksService(data: {
    query?: string;
    status?: string;
    assignee?: string;
  }) {
    return this.http.get<{ $values: any }>(
      `http://localhost:5071/api/Tickets?query=${data.query}&status=${data.status}&assignee=${data.assignee}`
    );
  }
  createTaskService(data: any) {
    console.log(data);
    return this.http.post(`http://localhost:5071/api/Tickets`, {
      ...data,
      type: data.taskType,
    });
  }
}
