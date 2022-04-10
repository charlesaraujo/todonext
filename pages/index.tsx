import type { NextPage } from "next";
import { Center, Container, Stack } from "@mantine/core";
import useSWR, { useSWRConfig } from "swr";
import AddItem from "../components/addItem";
import Item from "../components/item";
import { Todo } from "../lib/db";
import SEO from "../components/seo";

interface PostProps {
  todos: Todo[];
}

const Home: NextPage<PostProps> = ({ todos }) => {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR<Todo[]>(`/api/todo`, (url: string) =>
    fetch(url).then((res) => res.json())
  );

  const handleAdd = async (description: string) => {
    if (!description) return;
    await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ description }),
    });
    mutate(`/api/todo`, data);
  };

  const handleDelete = async (id: number) => {
    if (!id) return;
    await fetch("/api/todo", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    mutate(`/api/todo`, data);
  };

  const handleSave = async (id: number, description: string, done: boolean) => {
    if (!id) return;
    if (!description) return;
    await fetch("/api/todo", {
      method: "PATCH",
      body: JSON.stringify({ id, description, done }),
    });
    mutate(`/api/todo`, data);
  };

  return (
    <>
      <SEO title="Teste SEO" description="teste Description 66" />
      <Container>
        <Center sx={{ marginTop: "14px" }}>
          <Stack spacing="lg" sx={{ width: "100%", maxWidth: "500px" }}>
            {data?.map((item, index) => (
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
