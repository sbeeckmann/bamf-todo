import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Identifiable } from "./identifiable";

/**
 * Base storage for a specific Identifable.
 * Each Identifable should receive its own storage implementation
 */
export abstract class AbstractIdentifiableStorage<T extends Identifiable> {
  private data: Map<number, T> = new Map<number, T>();
  private dataListChangeSubject: Subject<T[]> = new BehaviorSubject<T[]>([]);
  private entryChangeSubject: Subject<DataChange<T>> = new Subject<DataChange<T>>();
  private initSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Was the storage already initialised?
   */
  public get initialised$ (): Observable<boolean> {
    return this.initSubject.asObservable();
  }

  /**
   * Was the storage already initialised? Meaning we loaded some data
   */
  public get initialised (): boolean {
    return this.initSubject.value
  }

  /**
   * Try to find a stored element based on the provided id
   * @param id - the id of the element we try to find
   * @return the element if found or null
   */
  public find (id: number): T | null {
    const result = this.data.get(id);
    if (result) {
      return result;
    }
    return null;
  }

  /**
   * Add a new element to the storage. This will trigger the specific observables
   * If there is already an element with the id, this element is replaced
   * @param data - the data to add
   */
  public add (data: T): void {
    const entry = this.find(data.id);
    const changeType = entry == null ? ChangeType.ADDED : ChangeType.UPDATED;
    this.data.set(data.id, data);

    this.informListChangeListener();
    this.informEntryChangedListener(data, changeType);
  }

  /**
   * Add a number of elements to the internal storage.
   * If element id were already present they are replaced.
   * This will not trigger the update observables but the init stage if it was not initialised beforehand
   * @param dataList the list of elements
   */
  public addAll (dataList: T[]): void {
    for (let data of dataList) {
      this.data.set(data.id, data);
    }
    this.informListChangeListener()
    if (!this.initSubject.value) {
      this.initSubject.next(true)
    }
  }

  /**
   * Remove the element.
   * If an element with the id exists, it will be removed and the delete change is triggered
   * @param id the id of the element to remove
   */
  public remove (id: number): void {
    const entry = this.find(id);
    if (entry != null) {
      this.data.delete(id);
      this.informListChangeListener()
      this.informEntryChangedListener(entry, ChangeType.DELETED);
    }
  }

  /**
   * Return all currently present elements
   */
  public get values (): T[] {
    return Array.from(this.data.values());
  }

  /**
   * Observable to subscribe to for updates to the internal map (add, update, delete)
   */
  public get listChanged$ (): Observable<T[]> {
    return this.dataListChangeSubject.asObservable();
  }

  /**
   * Observable to subscribe in case you are interested if a specific element was changed
   */
  public entryChanged$ (): Observable<DataChange<T>> {
    return this.entryChangeSubject.asObservable();
  }

  /**
   * Reset the storage
   */
  public reset (): void {
    this.data.clear()
    this.dataListChangeSubject.next([])
    this.initSubject.next(false)
  }

  private informListChangeListener (): void {
    this.dataListChangeSubject.next(Object.assign([], Array.from(this.data.values())));
  }

  private informEntryChangedListener (entry: T, changeType: ChangeType): void {
    this.entryChangeSubject.next({changeType, entry});
  }

}

export interface DataChange<T> {
  entry?: T;
  changeType: ChangeType;
}

export enum ChangeType {
  ADDED,
  DELETED,
  UPDATED
}
