import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { TodoListElementComponent } from "../todo-list-element/todo-list-element.component";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    TodoListElementComponent
  ]
})
export class TodoListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
