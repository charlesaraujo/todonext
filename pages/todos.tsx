import type { NextPage } from "next";
import { Center, LoadingOverlay, Stack } from "@mantine/core";
import useSWR from "swr";
import { useTodoStore } from "../state/todo.state";
import AddItem from "../components/addItem";
import Item from "../components/item";
import { Todo } from "../lib/db";
import SEO from "../components/seo";

interface PostProps {
  todos: Todo[];
}
// pagina depreciada, agora é a index a ser chamada
const Todos: NextPage<PostProps> = () => {
  const { todos, add, remove, save, fetcher } = useTodoStore();
  useSWR(`getTodos`, fetcher);

  return (
    <>
      <SEO title="Tarefas - A Fazer" description="Lista de coisas para fazer" />

      <Center sx={(theme) => ({ marginTop: theme.spacing.lg })}>
        <Stack spacing="lg" sx={{ width: "100%", maxWidth: "500px" }}>
          {todos && todos.length >= 0 ? (
            todos?.map((item, index) => (
              <Item {...item} delete={remove} save={save} key={index} />
            ))
          ) : (
            <LoadingOverlay visible={true} />
          )}
          <AddItem create={add} />
        </Stack>
      </Center>
    </>
  );
};

export default Todos;
