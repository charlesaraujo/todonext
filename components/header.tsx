import { Center, Space, Divider, Title } from "@mantine/core";
import ThemeButton from "./themeButton";

const Header = () => {
  return (
    <nav>
      <Center sx={{ padding: "18px" }}>
        <Title order={1}>A fazer</Title>
        <Space w="xl" />
        <ThemeButton />
      </Center>
      <Divider />
    </nav>
  );
};

export default Header;
