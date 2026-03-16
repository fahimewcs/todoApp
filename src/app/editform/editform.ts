import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../services/todo-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Todo } from '../todolist/interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editform',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './editform.html',
  styleUrl: './editform.css',
})
export class Editform implements OnInit {
   todoId!: string;
  todoForm!: FormGroup;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.todoId = this.route.snapshot.paramMap.get('id') || '';
    this.loadTodo();
  }

  loadTodo() {
    this.todoService.getTodoById(this.todoId).subscribe((todo: Todo) => {
      this.todoForm = this.fb.group({
        title: [todo.title, Validators.required],
        description: [todo.description],
        category: [todo.category, Validators.required],
        priority: [todo.priority],
        startDate: [todo.startDate],
        endDate: [todo.endDate, Validators.required]
      });
    });
  }

  saveTodo() {
    const formValue = this.todoForm.value;
    if (new Date(formValue.endDate) < new Date(formValue.startDate)) {
      // alert('End date must be after Start date');
      this.message = "End date must be after Start date";
      return;
    }

    if (this.todoForm.valid) {
      this.todoService.updateTodo(this.todoId, this.todoForm.value).subscribe(() => {
        alert('Todo updated successfully!');
        this.router.navigate(['/todolist']); 
      });
    }
  }

}
