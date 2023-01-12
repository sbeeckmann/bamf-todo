import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {Todo} from "../../data/todo";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoRemoteService} from "../../messaging/todo-remote.service";

@Component({
  selector: 'app-todo-list-element',
  templateUrl: './todo-list-element.component.html',
  styleUrls: ['./todo-list-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListElementComponent {

  public readonly todoForm: FormGroup

  private readonly remoteTodo: TodoRemoteService
  private original?: Todo

  constructor() {
    this.todoForm = inject(FormBuilder).group({
      name: ['', Validators.required],
      done: [false],
    })
    this.remoteTodo = inject(TodoRemoteService)
  }

  /**
   * Toggle the done state of the todo
   */
  public onToggleStatus(): void {
    this.todoForm.patchValue({
      done: !this.done
    })

    if (!this.original) {
      return
    }

    this.original.done = !this.original.done
    this.remoteTodo.add(this.original)
  }

  @Input()
  public set todo(todo: Todo) {
    this.todoForm.patchValue({
      name: todo.name,
      done: todo.done
    })

    this.original = todo
  }

  public get name(): string {
    return this.todoForm.get('name')?.value
  }

  public get done(): boolean {
    return this.todoForm.get('done')?.value
  }

  /**
   * Save the updated todo
   * This will start the saving workflow
   */
  public onSave(): void {
    const todoName = this.name
    if (!this.original) {
      return
    }
    this.original.name = todoName
    this.remoteTodo.add(this.original)
  }

  /**
   * Delete the selected todo
   */
  public onDelete(): void {
    if (!this.original) {
      return
    }
    this.remoteTodo.remove(this.original)
  }
}
