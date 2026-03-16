import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

 filteredTodos: Todo[] = [];

  // filter fields
  filterCategory: string = '';
  filterStatus: string = '';
  filterPriority: string = '';
  filterStartDate: string = '';
  filterEndDate: string = '';

  constructor(private todoService: TodoService, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    console.log('Todolist component loaded');
    this.loadTodos();
  }

  loadTodos() {
    console.log('loadtodos');
    this.todoService.getTodos().subscribe((data: Todo[]) => {
      this.todos = data;
      this.filteredTodos = data;
      this.cdr.detectChanges();
  
    });
  }

  applyFilter(){
      this.filteredTodos = this.todos.filter(todo => {

      const categoryMatch = !this.filterCategory || todo.category === this.filterCategory;

      const statusMatch = !this.filterStatus || todo.status === this.filterStatus;

      const priorityMatch = !this.filterPriority || todo.priority === this.filterPriority;

      const startDateMatch = !this.filterStartDate || new Date(todo.startDate) >= new Date(this.filterStartDate);

      const endDateMatch = !this.filterEndDate || new Date(todo.endDate) <= new Date(this.filterEndDate);

      return (categoryMatch && statusMatch && priorityMatch && startDateMatch && endDateMatch);
    });
  }
   


  resetFilters() {
    this.filterCategory = '';
    this.filterStatus = '';
    this.filterPriority = '';
    this.filterStartDate = '';
    this.filterEndDate = '';

    this.filteredTodos = this.todos;
  }


  get isFilterActive(): boolean {
  return (!!this.filterCategory || !!this.filterStatus || !!this.filterPriority || !!this.filterStartDate ||!!this.filterEndDate);
}


updateStatus(todo: Todo) {
  // Only update status field
  this.todoService.updateTodoStatus(todo.id, todo.status).subscribe(() => {
    console.log(`Todo ${todo.id} status updated to ${todo.status}`);
  });
}

  deleteTodo(id: string) {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.loadTodos();
      });
    }
  }

  editTodo(id: string) {
    this.router.navigate(['/editform', id]);
  }
}
    


