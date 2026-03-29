import { Component, computed, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Todo } from '../todolist/interface';
import { TodoService } from '../services/todo-service';

@Component({
  selector: 'app-dash-statistics',
  imports: [],
  templateUrl: './dash-statistics.html',
  styleUrl: './dash-statistics.css',
})
export class DashStatistics implements OnInit{
   // local signal to hold todos
  private todosSignal = signal<Todo[]>([]);

  // computed properties
  totalTasks = computed(() => this.todosSignal().length);
  completedTasks = computed(
    () => this.todosSignal().filter(todo => todo.status === 'Completed').length
  );
  pendingTasks = computed(
    () => this.todosSignal().filter(todo => todo.status === 'Pending').length
  );
  highPriorityTasks = computed(
    () => this.todosSignal().filter(todo => todo.priority === 'High').length
  );

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    // fetch todos from service
    this.todoService.getTodos().subscribe(todos => {
      this.todosSignal.set(todos);
    });
  }

}
