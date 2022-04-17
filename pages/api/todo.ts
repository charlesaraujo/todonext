// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { createTodo, getAllTodos, deleteOne, updateOne } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
    return;
  }

  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const result = await createTodo(data.description);
    res.status(200).json({ message: "Sucesso", todo: result });
  }

  if (req.method === "DELETE") {
    const data = JSON.parse(req.body);
    const { id } = await deleteOne(data.id);
    res.status(200).json({ message: "Sucesso", id });
  }

  if (req.method === "PATCH") {
    const data = JSON.parse(req.body);
    const result = await updateOne(data.id, data.description, data.done);
    res.status(200).json({ message: "Sucesso", todo: result });
  }

  if (req.method === "GET") {
    const data = await getAllTodos();
    res.status(200).json(data);
  }
}
