import { Component, signal } from '@angular/core';
import { TodoService } from '../services/todo-service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todolist',
  imports: [FormsModule, DatePipe],
  templateUrl: './todolist.html',
  styleUrl: './todolist.css',
})
export class Todolist {
  newTodoTitle = signal('');
  newTodoDescription = signal('');
  newTodoCategory = signal('');
  newTodoStatus = signal('');
  newTodoDeadline = signal(new Date().toISOString().split('T')[0]);


  constructor(public todoService: TodoService){}
  

  add(){
    const value = this.newTodoTitle().trim()
    if(value){
    this.todoService.addTodo(
        this.newTodoTitle(),
        this.newTodoDescription(),
        this.newTodoCategory(),
        this.newTodoStatus(),
        new Date(this.newTodoDeadline())
      );
      this.newTodoTitle.set('');
      this.newTodoDescription.set('');
      this.newTodoCategory.set('');
      this.newTodoStatus.set('');
      this.newTodoDeadline.set(new Date().toISOString().split('T')[0]);
  }

  }
  

}
