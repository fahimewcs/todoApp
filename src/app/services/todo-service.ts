import { Injectable, signal } from '@angular/core';
import {  Todo } from '../todolist/interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

// private apiUrl = 'http://localhost:3000/todos'; 
private apiUrl = 'https://todoapp-4pmw.onrender.com/todos';
  constructor(private http: HttpClient) {}

  // Fetch all todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  // Fetch a todo by ID
  getTodoById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  // Add a new todo
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  // Update a todo
  updateTodo(id: string, todo: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo);
  }

  updateTodoStatus(id: string, status: string) {
  // Only update status
  return this.http.patch<Todo>(`${this.apiUrl}/${id}`, { status });
}

  // Delete a todo
  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
