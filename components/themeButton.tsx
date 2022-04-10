import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
export default function ThemeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Mudar cores"
    >
      {dark ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
    </ActionIcon>
  );
}
