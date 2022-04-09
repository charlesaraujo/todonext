import type { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { Center, Container, Stack } from "@mantine/core";
import AddItem from "../components/addItem";
import Item from "../components/item";
import { getAllTodos, Todo } from "../lib/db";
import SEO from "../components/seo";

interface PostProps {
  todos: Todo[];
}

const getData = async () => {
  const todos = await fetch("/api/todo");
  return await todos.json();
};

// export const getStaticProps: GetStaticProps = async () => {
//   const todos: Todo[] = await getAllTodos();
//   return {
//     props: {
//       todos,
//     },
//     revalidate: 5,
//   };
// };

const Home: NextPage<PostProps> = ({ todos }) => {
  const [td, setTd] = useState<Todo[]>(todos);
  useEffect(() => {
    refresh();
  }, [td]);

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

  const handleSave = async (id: number, description: string, done: boolean) => {
    if (!id) return;
    if (!description) return;
    await fetch("/api/todo", {
      method: "PATCH",
      body: JSON.stringify({ id, description, done }),
    });
    refresh();
  };

  return (
    <>
      <SEO title="Teste SEO" description="teste Description 66" />
      <Container>
        <Center sx={{ marginTop: "14px" }}>
          <Stack spacing="lg" sx={{ width: "100%", maxWidth: "500px" }}>
            {td?.map((item, index) => (
              <Item
                {...item}
                delete={handleDelete}
                save={handleSave}
                key={index}
              />
            ))}
            <AddItem create={handleAdd} />
          </Stack>
        </Center>
      </Container>
    </>
  );
};

export default Home;
