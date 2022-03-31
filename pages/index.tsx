import type { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import Form from "../components/form";
import Item from "../components/item";
import { getAllTodos, Todo } from "../lib/db";

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
  const [td, setTd] = useState(todos);

  const refresh = async () => {
    console.log("refr");
    setTd(await getData());
  };

  const handleClick = async (description: string) => {
    if (!description) return;
    console.log(description);
    await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ description }),
    });
    refresh();
  };

  return (
    <>
      {/* TODO: resolver problema com SEO ( não gera o title serverside) */}
      <Head>
        <title>A fazer</title>
        <meta name="description" content="Lista pessoal de afazeres" />
      </Head>

      <Form create={handleClick} />
      <div onClick={refresh}>
        {td?.map((item, index) => (
          <Item {...item} key={index} />
        ))}
      </div>
    </>
  );
};

export default Home;
