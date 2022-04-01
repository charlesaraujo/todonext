// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createTodo, getAllTodos, deleteOne } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    await createTodo(data.description);
    res.status(200).json({ message: "Sucesso" });
  }

  if (req.method === "DELETE") {
    const data = JSON.parse(req.body);
    await deleteOne(data.id);
    res.status(200).json({ message: "Sucesso" });
  }

  if (req.method === "GET") {
    const data = await getAllTodos();
    res.status(200).json(data);
  }
}
