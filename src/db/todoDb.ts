import Dexie, { type Table } from "dexie";
import type { Todo } from "@/types/todo";

export class TodoDatabase extends Dexie {
  todos!: Table<Todo, number>;
  deletedTodos!: Table<Todo, number>;

  constructor() {
    super("TodoDB");
    this.version(1).stores({
      todos: "++id,title,completed,userId",
      deletedTodos: "++id,title,completed,userId",
    });
  }
}

export const db = new TodoDatabase();
