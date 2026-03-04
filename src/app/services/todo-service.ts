import { Injectable, signal } from '@angular/core';
import { Interface } from '../todolist/interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos = signal<Interface[]>([]);

  getTodos(){
    return this.todos;
  }

  addTodo(title:string, description:string, category:string, status: string, deadline:Date){
    const newTodo: Interface ={
      id:Date.now(),
      title,
      description,
      category,
      status,
      deadline
    }
    this.todos.update(todos => [...todos, newTodo]);
  }

  deleteTodo(id:number){
    this.todos.update(todo => todo.filter(todo => todo.id !==id))
  }

  updateTodo(
  id: number,
  data: { title: string; description: string; category: string; status: string; deadline: Date }
) {
  this.todos.update(todos =>
    todos.map(todo => (todo.id === id ? { ...todo, ...data } : todo))
  );
}

 getTodoById(id: number): Interface | null {
    return this.todos().find(todo => todo.id === id) || null;
  }
}
