import { inject, Injectable } from '@angular/core';
import { TodoStorageService } from "../data/todo-storage.service";
import { Todo } from "../data/todo";

/**
 * Remote service class for everything related to the Todo feature
 */
@Injectable({
  providedIn: 'root'
})
export class TodoRemoteService {

  private readonly todoService: TodoStorageService

  constructor () {
    this.todoService = inject(TodoStorageService)
  }

  // normally we would here load the data from somewhere, normally some kind of backend
  // but for demonstration purpose we just fake the data
  public load (): void {
    const todos: Todo[] = [
      {
        name: 'Bamf example',
        description: 'Write a small todo list for the bamf project',
        created: new Date().getTime(),
        finished: true,
        finishedAt: new Date().getTime(),
        id: 0
      }
    ]
  }
}
