import { Component, computed, signal } from '@angular/core';
import { TodoService } from '../services/todo-service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

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
  newTodoStatus = signal('');
  newTodoDeadline = signal(new Date().toISOString().split('T')[0]);


  constructor(public todoService: TodoService){}
  

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
      this.newTodoStatus.set('');
      this.newTodoDeadline.set(new Date().toISOString().split('T')[0]);
  }

  editTodo(id: number) {
    const todo = this.todoService.getTodoById(id);
    if (!todo) return;

    this.editId.set(todo.id);
    this.newTodoTitle.set(todo.title);
    this.newTodoDescription.set(todo.description);
    this.newTodoCategory.set(todo.category);
    this.newTodoStatus.set(todo.status);
    this.newTodoDeadline.set(new Date(todo.deadline).toISOString().split('T')[0]);
  }

  

  filterType = signal(''); 
  filterValue = signal(''); 

  filteredTodos = computed(() => {
    let todos = [...this.todoService.todos()];

    if (!this.filterType() || !this.filterValue()) {
      return todos; 
    }

    if (this.filterType() === 'status') {
      return todos.filter(todo => todo.status === this.filterValue());
    }

    if (this.filterType() === 'category') {
      return todos.filter(todo => todo.category === this.filterValue());
    }

    if (this.filterType() === 'deadline') {
      return todos.filter(todo =>
        new Date(todo.deadline).toDateString() ===
        new Date(this.filterValue()).toDateString()
      );
    }

    return todos;
  });

  
  

}
