import { Injectable } from '@angular/core';
import { AbstractIdentifiableStorage } from "../../../core/data/abstract-identifable.storage";
import { Todo } from "./todo";

/**
 * Service class responsible for the storage of the Todo elements
 */
@Injectable({
  providedIn: 'root'
})
export class TodoStorageService
  extends AbstractIdentifiableStorage<Todo> {
}
