import { Identifiable } from "../../../core/data/identifiable";

export interface Todo extends Identifiable {
  // the name of the todo
  name: string
  id: number
  // is the todo done?
  done: boolean
  // when was the todo created
  creationTime: number
}
