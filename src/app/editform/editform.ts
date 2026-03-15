import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../services/todo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../todolist/interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editform',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editform.html',
  styleUrl: './editform.css',
})
export class Editform {
  todoForm: FormGroup;
  todoId!: string;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      priority: [''],
      status: ['Pending'],
      assignedTo: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.todoId = idParam;
        this.loadTodo(this.todoId);
      }
    });
  }

  loadTodo(id: string) {
    this.todoService.getTodoById(id).subscribe((todo: Todo) => {
      this.todoForm.patchValue({
        title: todo.title,
        description: todo.description,
        category: todo.category,
        priority: todo.priority,
        status: todo.status,
        assignedTo: todo.assignedTo,
        startDate: new Date(todo.startDate).toISOString().split('T')[0],
        endDate: new Date(todo.endDate).toISOString().split('T')[0]
      });
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

    const updatedTodo: Partial<Todo> = {
      title: formValue.title,
      description: formValue.description,
      category: formValue.category,
      priority: formValue.priority,
      status: formValue.status,
      assignedTo: formValue.assignedTo,
      startDate: formValue.startDate,
     endDate: formValue.endDate
    };

    this.todoService.updateTodo(this.todoId, updatedTodo).subscribe(() => {
      alert('Todo updated successfully!');
      this.router.navigate(['/todos']); // Redirect to list page
    });
  }

}
