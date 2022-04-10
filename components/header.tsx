import Link from "next/link";
import { Divider, Title, Button, Container, Box, Loader } from "@mantine/core";
import { AiFillGithub, AiOutlineLogout } from "react-icons/ai";
import { signIn, useSession, signOut } from "next-auth/react";
import ThemeButton from "./themeButton";
import { useState } from "react";

const Header = () => {
  const [load, setLoad] = useState(false);
  const { status } = useSession();

  const handleSignIn = async () => {
    setLoad(true);
    await signIn("github", { callbackUrl: "/todos" });
  };
  const handleSignOut = async () => {
    setLoad(true);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav>
      <Container
        sx={{
          padding: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Link href="/" passHref>
          <Title
            sx={{
              cursor: "pointer",
              "@media (max-width: 500px)": {
                width: "100vw",
              },
            }}
            order={1}
          >
            A fazer
          </Title>
        </Link>
        <ThemeButton />
        {status === "loading" ? (
          <Box
            sx={{ width: "100px", display: "flex", justifyContent: "center" }}
          >
            <Loader size="sm" variant="dots" />
          </Box>
        ) : status === "authenticated" ? (
          <Box>
            <Link href="/todos" passHref>
              <Button component="a">Tarefas</Button>
            </Link>
            <Button
              variant="subtle"
              loading={load}
              loaderPosition="right"
              onClick={handleSignOut}
              rightIcon={<AiOutlineLogout size={18} />}
              sx={(theme) => ({
                marginLeft: theme.spacing.xs,
              })}
            >
              Sair
            </Button>
          </Box>
        ) : (
          <Button
            loading={load}
            onClick={handleSignIn}
            leftIcon={<AiFillGithub size={18} />}
          >
            Entrar com Github
          </Button>
        )}
      </Container>
      <Divider />
    </nav>
  );
};

export default Header;
