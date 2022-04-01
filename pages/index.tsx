import type { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import AddItem from "../components/addItem";
import Form from "../components/form";
import Item from "../components/item";
import { getAllTodos, Todo } from "../lib/db";

// TODO: criar _document
// TODO: Add font
interface PostProps {
  todos: Todo[];
}

const getData = async () => {
  const todos = await fetch("/api/todo");
  return await todos.json();
};

export const getStaticProps: GetStaticProps = async () => {
  //TODO: remover chamada direta pro db
  const todos: Todo[] = await getAllTodos();
  return {
    props: {
      todos,
    },
    revalidate: 5,
  };
};

const Home = ({ todos }: PostProps) => {
  const [td, setTd] = useState<Todo[]>(todos);

  const refresh = async () => {
    //TODO: revalidate cache da home page pro no proximo request do cliente ser atualizado
    setTd(await getData());
  };

  const handleAdd = async (description: string) => {
    if (!description) return;
    await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ description }),
    });
    refresh();
  };
  const handleDelete = async (id: number) => {
    if (!id) return;
    await fetch("/api/todo", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    refresh();
  };

  return (
    <div>
      {/* // TODO: resolver problema com SEO ( não gera o title serverside) */}
      <Head>
        <title>A fazer</title>
        <meta name="description" content="Lista pessoal de afazeres" />
      </Head>

      <Form create={handleAdd} />
      <div>
        {td?.map((item, index) => (
          <Item {...item} key={index} delete={handleDelete} />
        ))}
      </div>
      <AddItem />
    </div>
  );
};

export default Home;
