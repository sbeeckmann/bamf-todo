import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import {TodoResolver} from "./data/todo.resolver";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview'
      },
      {
        path: 'overview',
        component: TodoListComponent,
        resolve: [TodoResolver]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoListRoutingModule {
}
