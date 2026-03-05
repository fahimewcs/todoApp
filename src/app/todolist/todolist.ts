import { Component, computed, signal } from '@angular/core';
import { TodoService } from '../services/todo-service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Interface } from './interface';

@Component({
  selector: 'app-todolist',
  imports: [FormsModule, DatePipe, CommonModule],
  templateUrl: './todolist.html',
  styleUrl: './todolist.css',
})
export class Todolist {

  editId = signal<number |null>(null);

  newTodoTitle = signal('');
  newTodoDescription = signal('');
  newTodoCategory = signal('');
  newTodoStatus = signal('Pending');
  newTodoDeadline = signal(new Date().toISOString().split('T')[0]);


  constructor(public todoService: TodoService){
    this.filteredTodosList.set(this.todoService.todos());
  }
  

  add(){
    const value = this.newTodoTitle().trim()
    if(!value) return;
    
    const todoData = {
      title: this.newTodoTitle(),
      description: this.newTodoDescription(),
      category: this.newTodoCategory(),
      status: this.newTodoStatus(),
      deadline: new Date(this.newTodoDeadline())
    }

    if(this.editId() !==null){
      this.todoService.updateTodo(this.editId()!, todoData);
      this.editId.set(null);
    }
    else{
    this.todoService.addTodo(
        todoData.title,
        todoData.description,
        todoData.category,
        todoData.status,
        todoData.deadline
      );
    }
      this.newTodoTitle.set('');
      this.newTodoDescription.set('');
      this.newTodoCategory.set('');
      this.newTodoStatus.set('Pending');
      this.newTodoDeadline.set(new Date().toISOString().split('T')[0]);

      this.filteredTodosList.set(this.todoService.todos());
  }

  editTodo(id: number) {
    const todo = this.todoService.getTodoById(id);
    if (!todo) return;

    this.editId.set(todo.id);
    this.newTodoTitle.set(todo.title);
    this.newTodoDescription.set(todo.description);
    this.newTodoCategory.set(todo.category);
    // this.newTodoStatus.set(todo.status);
    this.newTodoDeadline.set(new Date(todo.deadline).toISOString().split('T')[0]);
  }

  

filterStatus = signal('');
filterCategory = signal('');
filterDeadline = signal(''); 

filteredTodosList = signal<Interface[]>([]);

 applyFilter(): void {

  let todos = [...this.todoService.todos()];

  const status = this.filterStatus();
  if (status) {
    todos = todos.filter(todo => todo.status === status);
  }

  const category = this.filterCategory();
  if (category) {
    todos = todos.filter(todo => todo.category === category);
  }


  const deadline = this.filterDeadline();
  if (deadline) {
    todos = todos.filter(todo => {
      const todoDate = new Date(todo.deadline).toISOString().split('T')[0];
      return todoDate === deadline;
    });
  }
  this.filteredTodosList.set(todos);
}

resetFilter(): void {
  
  this.filterStatus.set('');
  this.filterCategory.set('');
  this.filterDeadline.set('');

  
  this.filteredTodosList.set(this.todoService.todos());
}


deleteTodo(id: number) {

  this.todoService.deleteTodo(id);

  this.filteredTodosList.set(this.todoService.todos());
}

  

}
