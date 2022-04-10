import type { NextPage } from "next";
import { Center, Container, LoadingOverlay, Stack } from "@mantine/core";
import useSWR, { useSWRConfig } from "swr";
import AddItem from "../components/addItem";
import Item from "../components/item";
import { Todo } from "../lib/db";
import SEO from "../components/seo";

interface PostProps {
  todos: Todo[];
}

const Todos: NextPage<PostProps> = ({ todos }) => {
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
    mutate(`/api/todo`);
  };

  const handleDelete = async (id: number) => {
    if (!id) return;
    await fetch("/api/todo", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    mutate(`/api/todo`);
  };

  const handleSave = async (id: number, description: string, done: boolean) => {
    if (!id) return;
    if (!description) return;
    await fetch("/api/todo", {
      method: "PATCH",
      body: JSON.stringify({ id, description, done }),
    });
    mutate(`/api/todo`);
  };

  return (
    <>
      <SEO title="Tarefas - A Fazer" description="Lista de coisas para fazer" />
      <Container>
        <Center sx={(theme) => ({ marginTop: theme.spacing.lg })}>
          <Stack spacing="lg" sx={{ width: "100%", maxWidth: "500px" }}>
            {data && data.length >= 0 ? (
              data?.map((item, index) => (
                <Item
                  {...item}
                  delete={handleDelete}
                  save={handleSave}
                  key={index}
                />
              ))
            ) : (
              <LoadingOverlay visible={true} />
            )}
            <AddItem create={handleAdd} />
          </Stack>
        </Center>
      </Container>
    </>
  );
};

export default Todos;
