import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodoListRoutingModule} from "./todo-list-routing.module";
import {TodoListComponent} from "./components/todo-list/todo-list.component";
import {TodoListElementComponent} from "./components/todo-list-element/todo-list-element.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatInputModule} from "@angular/material/input";
import {NgScrollbarModule} from "ngx-scrollbar";



@NgModule({
  declarations: [TodoListComponent, TodoListElementComponent],
  imports: [
    CommonModule,
    TodoListRoutingModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatInputModule,
    NgScrollbarModule
  ]
})
export class TodoListModule { }
