import create from "zustand";
import { persist } from "zustand/middleware";
import { Todo } from "../lib/db";
import { useThemeStore } from "./theme.state";

type Store = {
  todos: Todo[] | [];
  session: string;
  setSession: (string: string) => void;
  set: (todos: Todo[] | []) => void;
  add: (description: string) => void;
  remove: (id: number) => void;
  save: (id: number, description: string, done: boolean) => void;
  fetcher: () => Promise<void>;
};

export const useTodoStore = create<Store>(
  persist<Store>(
    (set, get) => ({
      todos: [] as Todo[],
      session: "",
      setSession: (session: string) => set({ session }),
      set: (todos) => set({ todos }),
      fetcher: async () => {
        if (get().session !== "authenticated") {
          set({ todos: get().todos });
          return;
        }
        const result = await fetch(`/api/todo`);
        const data = await result.json();
        if (data.error) return;
        set({ todos: data });
      },
      add: async (description) => {
        if (!description) return;

        if (get().session !== "authenticated") {
          set((state) => ({
            todos: [
              ...state.todos,
              { id: new Date().valueOf(), description, done: false },
            ],
          }));
          return;
        }

        const result = await fetch("/api/todo", {
          method: "POST",
          body: JSON.stringify({ description }),
        });

        const { todo } = await result.json();

        set((state) => ({ todos: [...state.todos, todo] }));
      },
      remove: async (todoId) => {
        if (!todoId) return;

        if (get().session !== "authenticated") {
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== todoId),
          }));
          return;
        }

        const result = await fetch("/api/todo", {
          method: "DELETE",
          body: JSON.stringify({ id: todoId }),
        });

        const { id } = await result.json();

        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
      save: async (id: number, description: string, done: boolean) => {
        if (!id) return;
        if (!description) return;

        if (get().session !== "authenticated") {
          set((state) => ({
            todos: state.todos.map((td) =>
              td.id === id ? { id, description, done } : td
            ),
          }));
          return;
        }

        const result = await fetch("/api/todo", {
          method: "PATCH",
          body: JSON.stringify({ id, description, done }),
        });

        const { todo } = await result.json();

        set((state) => ({
          todos: state.todos.map((td) => (td.id === id ? todo : td)),
        }));
      },
    }),
    { name: "todo-store", version: 1.1 }
  )
);
