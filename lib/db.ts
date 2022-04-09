import { prisma } from "./prisma";

export interface Todo {
  id: number;
  description: string;
  done: boolean;
}

export async function getAllTodos() {
  const data = await prisma.todo.findMany();
  return data.reverse();
}

export async function createTodo(description: string) {
  if (!description) throw new Error("description is required");
  await prisma.todo.create({ data: { description } });
}

export async function deleteOne(id: number) {
  if (!id) throw new Error("id is required");
  await prisma.todo.delete({ where: { id } });
}

export async function updateOne(
  id: number,
  description: string,
  done: boolean
) {
  if (!id) throw new Error("id is required");
  if (!description) throw new Error("description is required");
  await prisma.todo.update({
    where: { id },
    data: { description, done },
  });
}
