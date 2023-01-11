import { Identifiable } from "../../../core/data/identifiable";

export interface Todo extends Identifiable {
  // the name of the todo
  name: string
  // the description, what is it about?
  description: string
  // when was it added?
  created: number
  // is it done?
  finished: boolean
  // when is it finished
  finishedAt?: number
  id: number
}
