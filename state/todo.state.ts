import create from "zustand";
import { Todo } from "../lib/db";

type Store = {
  todos: Todo[] | [];
  set: (todos: Todo[] | []) => void;
  add: (description: string) => void;
  remove: (id: number) => void;
  save: (id: number, description: string, done: boolean) => void;
  fetcher: () => Promise<void>;
};

export const useTodoStore = create<Store>((set) => ({
  todos: [] as Todo[],
  set: (todos) => set({ todos }),
  fetcher: async () => {
    const result = await fetch(`/api/todo`);

    set({ todos: await result.json() });
  },
  add: async (description) => {
    if (!description) return;

    const result = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ description }),
    });

    const { todo } = await result.json();

    set((state) => ({ todos: [...state.todos, todo] }));
  },
  remove: async (todoId) => {
    if (!todoId) return;

    const result = await fetch("/api/todo", {
      method: "DELETE",
      body: JSON.stringify({ id: todoId }),
    });

    const { id } = await result.json();

    set((state) => {
      const todos = state.todos.filter((todo) => todo.id !== id);
      return { todos };
    });
  },
  save: async (id: number, description: string, done: boolean) => {
    if (!id) return;
    if (!description) return;

    const result = await fetch("/api/todo", {
      method: "PATCH",
      body: JSON.stringify({ id, description, done }),
    });

    const { todo } = await result.json();

    set((state) => {
      const todos = state.todos.map((td) => (td.id === id ? todo : td));
      return { todos };
    });
  },
}));
