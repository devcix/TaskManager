import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/api/tasks'; 

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(taskId: number): Observable<Task> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.get<Task>(url);
  }

  updateTask(taskId: number, updatedTaskData: Task): Observable<Task> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.put<Task>(url, updatedTaskData);
  }

  createTask(newTaskData: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, newTaskData);
  }
}
