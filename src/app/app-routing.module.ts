import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'todos',
    loadChildren: () => import('./feature/todo-list/todo-list-routing.module').then(module => module.TodoListRoutingModule)
  },
  {
    path: '**', // any path leads to rome
    redirectTo: 'todos'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
