import { Component, computed, inject, signal } from '@angular/core';
import { TodoService } from '../services/todo-service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Todo } from './interface';

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
  newTodoPriority = signal('');
  newTodoStatus = signal('Pending');
  newTodoAssigndedTo = signal('');
  newTodoStartDate = signal(new Date().toISOString().split('T')[0]);
  newTodoEndDate = signal('');

  titleError = signal('');
  categoryError = signal('');
  endDateError = signal('');


  // constructor(public todoService: TodoService){
  //   // this.filteredTodosList.set(this.todoService.todos());
  // }
  todoService = inject(TodoService);

  add(){
  let hasError = false;

  if(!this.newTodoTitle().trim()){
    this.titleError.set('Title is required');
    hasError = true;
  }


  if(!this.newTodoCategory()){
    this.categoryError.set('Category is required');
    hasError = true;
  }

  if(!this.newTodoEndDate()){
    this.endDateError.set('End date is required');
    hasError = true;
  }

  if(new Date(this.newTodoEndDate()) < new Date(this.newTodoStartDate())){
    this.endDateError.set('End date must be after start date');
    hasError = true;
  }

  if(hasError) return;
    
    const todoData = {
      title: this.newTodoTitle(),
      description: this.newTodoDescription(),
      category: this.newTodoCategory(),
      priority: this.newTodoPriority(),
      status: this.newTodoStatus(),
      assignedTo: this.newTodoAssigndedTo(),
      startDate: new Date(this.newTodoStartDate()),
      endDate: new Date(this.newTodoEndDate())
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
        todoData.priority,
        todoData.status,
        todoData.assignedTo,
        todoData.startDate,
        todoData.endDate
      );
    }
      this.newTodoTitle.set('');
      this.newTodoDescription.set('');
      this.newTodoCategory.set('');
      this.newTodoPriority.set('');
      this.newTodoStatus.set('Pending');
      this.newTodoAssigndedTo.set('');
      this.newTodoStartDate.set(new Date().toISOString().split('T')[0]);
      this.newTodoEndDate.set('');

      this.filteredTodosList.set(this.todoService.todos());
  }

  editTodo(id: number) {
    const todo = this.todoService.getTodoById(id);
    if (!todo) return;

    this.editId.set(todo.id);
    this.newTodoTitle.set(todo.title);
    this.newTodoDescription.set(todo.description);
    this.newTodoCategory.set(todo.category);
    this.newTodoPriority.set(todo.priority);
    this.newTodoAssigndedTo.set(todo.assignedTo);
    // this.newTodoStatus.set(todo.status);
    this.newTodoEndDate.set(new Date(todo.endDate).toISOString().split('T')[0]);
  }

  

filterStatus = signal('');
filterCategory = signal('');
filterDeadline = signal(''); 

filteredTodosList = signal<Todo[]>([]);


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
      const todoDate = new Date(todo.endDate).toISOString().split('T')[0];
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


  onTitleChange(value: string) {
    this.newTodoTitle.set(value);
    if (value.trim()) this.titleError.set('');
  }

  onCategoryChange(value: string) {
    this.newTodoCategory.set(value);
    if (value) this.categoryError.set('');
  }

  onEndDateChange(value: string) {
    this.newTodoEndDate.set(value);
    if (value) this.endDateError.set('');
  }


  isAddDisabled = computed(() => {
    return !this.newTodoTitle().trim();
  });

  isFilterDisabled = computed(() => {
    return !this.filterStatus() && !this.filterCategory() && !this.filterDeadline();
  });

  isResetDisabled = computed(()=>{
    const filtersEmpty = !this.filterStatus() && !this.filterCategory() && !this.filterDeadline();
  
    const tableEmpty = this.filteredTodosList().length === 0;

    return filtersEmpty && tableEmpty;
  })
    

}
