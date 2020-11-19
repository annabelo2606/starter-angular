import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html' ,
})
export class AppComponent {
  title = "Ng Tasks";
  todos = [];

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todo) {}

  markAsCompleted(todo) {}


}
