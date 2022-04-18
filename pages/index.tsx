import type { NextPage } from "next";
import { Center, Space, Text } from "@mantine/core";
import SEO from "../components/seo";

const Home: NextPage<any> = () => {
  return (
    <>
      <SEO
        title="A Fazer"
        description="Cadastre e conclua suas tarefas em qualquer lugar do mundo"
      />

      <Center
        sx={(theme) => ({
          marginTop: theme.spacing.lg,
          display: "flex",
          flexDirection: "column",
        })}
      >
        <Space h="lg" />
        <Text>Cadastre e conclua suas tarefas em qualquer lugar do mundo</Text>
        <Space h="lg" />
        <Text> Conecte-se com o github para começar</Text>
      </Center>
    </>
  );
};

export default Home;
