import { ChangeDetectorRef, Component, computed, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../services/todo-service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Todo } from './interface';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-todolist',
  imports: [ReactiveFormsModule, CommonModule, DatePipe, FormsModule, RouterLink],
  templateUrl: './todolist.html',
  styleUrl: './todolist.css',
})
export class Todolist implements OnInit{

 todos: Todo[] = [];

  constructor(private todoService: TodoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('Todolist component loaded');
    this.loadTodos();
  }

  loadTodos() {
    console.log('loadtodos');
    this.todoService.getTodos().subscribe((data: Todo[]) => {
      this.todos = data;
      this.cdr.detectChanges();
  
    });
  }

// loadTodos() {
//   this.todoService.getTodos().subscribe({
//     next: (data) => {
//       console.log('Fetched todos:', data);
//       this.todos = data;
//       this.cdr.detectChanges(); 
//     },
//     error: (err) => console.error(err)
//   });
// }


  deleteTodo(id: string) {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.loadTodos();
      });
    }
  }

  // editTodo(id: string) {
  //   this.router.navigate(['/todos/edit', id]);
  // }
}
    


