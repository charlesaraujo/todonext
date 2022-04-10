import type { NextPage } from "next";
import { Center, Container, Space, Text } from "@mantine/core";
import SEO from "../components/seo";

// TODO Relacionamento user e todos
// TODO PWA
// TODO lighthouse 100
const Home: NextPage<any> = () => {
  return (
    <>
      <SEO
        title="A Fazer"
        description="Cadastre e conclua suas tarefas em qualquer lugar do mundo"
      />
      <Container>
        <Center
          sx={{ marginTop: "14px", display: "flex", flexDirection: "column" }}
        >
          <Space h="lg" />
          <Text>
            Cadastre e conclua suas tarefas em qualquer lugar do mundo
          </Text>
          <Space h="lg" />
          <Text> Conecte-se com o github para começar</Text>
        </Center>
      </Container>
    </>
  );
};

export default Home;
