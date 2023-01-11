import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { filter, Observable, of, take } from 'rxjs';
import { TodoRemoteService } from "../messaging/todo-remote.service";
import { TodoStorageService } from "./todo-storage.service";

/**
 * Resolve the data required for the routing to the todo list feature
 */
@Injectable({
  providedIn: 'root'
})
export class TodoResolver implements Resolve<boolean> {

  constructor (private todoRemote: TodoRemoteService, private todoStorage: TodoStorageService) {
  }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.todoStorage.initialised) {
      return of(true)
    }

    this.todoRemote.load()
    return this.todoStorage.initialised$
      .pipe(
        filter(value => value), // only true
        take(1) // clean up after the first emit
      )
  }
}
