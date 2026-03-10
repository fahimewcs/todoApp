import { Injectable, signal } from '@angular/core';
import {  Todo } from '../todolist/interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos = signal<Todo[]>([]);

  // getTodos(){
  //   return this.todos;
  // }

  addTodo(title:string, description:string, category:string,priority:string, status: string, assignedTo: string,startDate:Date, endDate:Date){
    const newTodo: Todo ={
      id:Date.now(),
      title,
      description,
      category,
      priority,
      status,
      assignedTo,
      startDate,
      endDate
    }
    this.todos.update(todos => [...todos, newTodo]);
  }

  deleteTodo(id:number){
    this.todos.update(todos => todos.filter(todo => todo.id !==id))
  }

  updateTodo(
  id: number,
  data: { title: string; description: string; category: string; priority:string, status: string; assignedTo:string, endDate: Date }
) {
  this.todos.update(todos =>
    todos.map(todo => (todo.id === id ? { ...todo, ...data } : todo))
  );
}




 getTodoById(id: number): Todo | null {
    return this.todos().find(todo => todo.id === id) || null;
  }
}
