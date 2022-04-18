import { prisma } from "./prisma";

export interface Todo {
  id: number;
  description: string;
  done: boolean;
}

export async function getAllTodos(userId: string) {
  return await prisma.todo.findMany({
    where: { userId },
    select: {
      id: true,
      description: true,
      done: true,
    },
  });
}

export async function createTodo(description: string, userId: string) {
  if (!description) throw new Error("description is required");
  return await prisma.todo.create({
    data: { description, userId },
    select: { id: true, description: true, done: true },
  });
}

export async function deleteOne(id: number, userId: string) {
  if (!id) throw new Error("id is required");
  return await prisma.todo.delete({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    select: { id: true, description: true, done: true },
  });
}

export async function updateOne(
  id: number,
  description: string,
  done: boolean,
  userId: string
) {
  if (!id) throw new Error("id is required");
  if (!description) throw new Error("description is required");
  return await prisma.todo.update({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    data: { description, done },
    select: { id: true, description: true, done: true },
  });
}
