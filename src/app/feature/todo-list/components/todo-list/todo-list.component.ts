import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {map, Observable} from "rxjs";
import {Todo} from "../../data/todo";
import {TodoStorageService} from "../../data/todo-storage.service";
import {TodoRemoteService} from "../../messaging/todo-remote.service";
import {CdkDragDrop} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {

  public readonly todos$: Observable<Todo[]>

  private readonly remoteTodos: TodoRemoteService

  constructor() {
    this.todos$ = inject(TodoStorageService).listChanged$
    this.remoteTodos = inject(TodoRemoteService)
  }

  /**
   * Create a new todo with some initial values
   */
  public onCreateTodo(): void {
    const todo: Todo = {
      name: '',
      id: Math.random(),
      done: false,
      creationTime: new Date().getTime()
    }
    this.remoteTodos.add(todo)

  }

  /**
   * Callback to process the drop of the drag and drop gesture
   * @param event
   */
  public drop(event: CdkDragDrop<string[]>): void {
    this.remoteTodos.positionChanged(event.previousIndex, event.currentIndex)
  }
}
