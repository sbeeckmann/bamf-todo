import {inject, Injectable} from '@angular/core';
import {TodoStorageService} from "../data/todo-storage.service";
import {Todo} from "../data/todo";
import {moveItemInArray} from "@angular/cdk/drag-drop";

/**
 * Remote service class for everything related to the Todo feature
 */
@Injectable({
  providedIn: 'root'
})
export class TodoRemoteService {

  private static TODO_KEY = "TODO_KEY"

  private readonly todoService: TodoStorageService

  constructor() {
    this.todoService = inject(TodoStorageService)
  }

  // normally we would here load the data from somewhere, normally some kind of backend
  // but for demonstration purpose we just take the data from the local storage
  public load(): void {
    const storedJson = localStorage.getItem(TodoRemoteService.TODO_KEY)
    if (!storedJson) {
      this.todoService.addAll([])
      return
    }

    const todos: Todo[] = JSON.parse(storedJson)
    this.todoService.addAll(todos)
  }

  public save(): void {
    const storedJson = JSON.stringify(this.todoService.values)
    localStorage.setItem(TodoRemoteService.TODO_KEY, storedJson)
    this.todoService.addAll(this.todoService.values)
  }

  public add(todo: Todo): void {
    this.todoService.add(todo)
    this.save()
  }

  /**
   * Remove the todo from the internal storage and update the local storage
   * @param todo - the todo to delete
   */
  public remove(todo: Todo): void {
    this.todoService.remove(todo.id)
    this.save()
  }

  /**
   * Update the todo position in the list
   * This will update the internal storage
   * @param oldIndex - the previous index in the list
   * @param targetIndex - the new index in the list
   */
  public positionChanged(oldIndex: number, targetIndex: number): void {
    const values = this.todoService.values
    moveItemInArray(values, oldIndex, targetIndex)
    this.todoService.replace(values)

    this.save()
  }
}
