import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../services/todo-service';
import { Todo } from '../todolist/interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-todoform',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './todoform.html',
  styleUrl: './todoform.css',
})
export class Todoform{

  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private todoService: TodoService, private router: Router) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      priority: [''],
      status: ['Pending'],
      startDate: [new Date().toISOString().split('T')[0]],
      endDate: ['', Validators.required]
    });
  }

  submit() {
    if (this.todoForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    const formValue = this.todoForm.value;

    if (new Date(formValue.endDate) < new Date(formValue.startDate)) {
      alert('End date must be after Start date');
      return;
    }

    const newTodo: Partial<Todo> = {
    title: formValue.title,
    description: formValue.description,
    category: formValue.category,
    priority: formValue.priority,
    status: formValue.status,
    assignedTo: formValue.assignedTo,
    startDate: formValue.startDate,
    endDate: formValue.endDate
  };

  this.todoService.addTodo(newTodo as Todo).subscribe(() => {
    alert('Todo added successfully!');
    this.router.navigate(['/dashboard/todolist']);
  });
  }

}
