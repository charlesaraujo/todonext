import { useState } from "react";
import { Center, Box, Text } from "@mantine/core";
import Form from "./form";

const AddItem = (props: any) => {
  const [showForm, setShowForm] = useState(false);
  function handlerCreate(description: string) {
    props.create(description);
    setShowForm(false);
  }

  return (
    <Box
      sx={(theme) => ({
        textAlign: "center",
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.md,
        borderStyle: "dotted",
        borderWidth: "2px",
      })}
    >
      {showForm && (
        <Form create={handlerCreate} cancel={() => setShowForm(false)} />
      )}
      {!showForm && (
        <Center
          onClick={() => setShowForm(true)}
          sx={(theme) => ({
            cursor: "pointer",
            padding: theme.spacing.lg,
            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.gray
                  : theme.colors.gray[1],
            },
          })}
        >
          <Text size="lg">Adicionar tarefa</Text>
        </Center>
      )}
    </Box>
  );
};

export default AddItem;
