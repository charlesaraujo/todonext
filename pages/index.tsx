import type { NextPage } from "next";
import { Center, LoadingOverlay, Stack, Text, Box } from "@mantine/core";
import SEO from "../components/seo";
import AddItem from "../components/addItem";
import Item from "../components/item";
import useSWR from "swr";
import { useTodoStore } from "../state/todo.state";
import { Todo } from "../lib/db";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface PostProps {
  todos: Todo[];
}

const Home: NextPage<PostProps> = () => {
  const [td, setTd] = useState<Todo[]>([]);
  const { status } = useSession();
  const { todos, session, add, remove, save, fetcher } = useTodoStore();
  useSWR(`getTodos`, fetcher);
  useEffect(() => {
    setTd(todos);
  }, [todos]);
  return (
    <>
      <SEO
        title="A Fazer"
        description="Cadastre e conclua suas tarefas em qualquer lugar do mundo"
      />
      {status === "unauthenticated" && (
        <Center
          sx={(theme) => ({ marginTop: theme.spacing.lg, fontWeight: "bold" })}
        >
          <Text> Faça login para melhor experiencia</Text>
        </Center>
      )}

      <Center sx={(theme) => ({ marginTop: theme.spacing.lg })}>
        <Stack spacing="lg" sx={{ width: "100%", maxWidth: "500px" }}>
          <Box>
            <Text> A Fazeres: </Text>
          </Box>
          {td && td.length >= 0 ? (
            td?.map((item, index) => (
              <Item {...item} delete={remove} save={save} key={index} />
            ))
          ) : (
            <LoadingOverlay visible={false} />
          )}
          <AddItem create={add} />
        </Stack>
      </Center>
    </>
  );
};

export default Home;
