import type { NextPage } from "next";
import Link from "next/link";
import { Center, Container, Title, Button, Space, Text } from "@mantine/core";
import { AiFillGithub } from "react-icons/ai";
import useSWR from "swr";
import SEO from "../components/seo";

const Home: NextPage<any> = () => {
  return (
    <>
      <SEO title="Teste SEO" description="teste Description 66" />
      <Container>
        <Center
          sx={{ marginTop: "14px", display: "flex", flexDirection: "column" }}
        >
          <Space h="lg" />
          <Text> Conecte-se e comece a terminar suas tarefas</Text>
          <Space h="lg" />
          <Link href="/dashboard" passHref>
            <Button leftIcon={<AiFillGithub size={18} />} component="a" compact>
              Entrar com Github
            </Button>
          </Link>
        </Center>
      </Container>
    </>
  );
};

export default Home;
