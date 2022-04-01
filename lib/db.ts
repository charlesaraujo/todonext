import { prisma } from "./prisma";

// criar DONE
export interface Todo {
  id: number;
  description: string;
}

export async function getAllTodos() {
  const data = await prisma.todo.findMany();
  return data.reverse();
}

export async function createTodo(description: string) {
  await prisma.todo.create({ data: { description } });
}

export async function deleteOne(id: number) {
  if (!id) throw new Error("id is required");
  await prisma.todo.delete({ where: { id } });
}
