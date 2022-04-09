import { useState } from "react";
import { ActionIcon, Box, Text, Space } from "@mantine/core";
import { AiOutlineCheckCircle, AiFillEdit } from "react-icons/ai";
import Form from "./form";

const Item = (props: any) => {
  const [showForm, setShowForm] = useState(false);

  function handlerDelete(id: number) {
    props.delete(id);
    setShowForm(false);
  }

  function handlerSave(id: number, description: string) {
    props.save(id, description, props.done);
    setShowForm(false);
  }
  function handlerDone(id: number, done: boolean) {
    props.save(id, props.description, done);
  }

  return (
    <Box
      sx={(theme) => ({
        boxShadow: theme.shadows.md,
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.gray
            : theme.colors.gray[0],
        borderRadius: theme.radius.md,
      })}
    >
      {showForm && (
        <Form
          {...props}
          save={handlerSave}
          delete={handlerDelete}
          cancel={() => setShowForm(false)}
        />
      )}
      {!showForm && (
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: theme.spacing.lg,
          })}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ActionIcon
              title={props.done ? "Concluir a fazer" : "Voltar a fazer"}
              variant="transparent"
              sx={(theme) => ({
                color: props.done
                  ? theme.colors.green[5]
                  : theme.colors.gray[5],
              })}
              onClick={() => handlerDone(props.id, !props.done)}
            >
              <AiOutlineCheckCircle size={24} />
            </ActionIcon>
            <Space w="xs" />
            <Text
              size="lg"
              sx={(theme) => ({
                color: props.done ? theme.colors.gray[5] : "inherit",
                textDecoration: props.done ? "line-through" : "none",
              })}
            >
              {props.description}
            </Text>
          </Box>
          <ActionIcon title="Editar" onClick={() => setShowForm(true)}>
            <AiFillEdit size={18} />
          </ActionIcon>
        </Box>
      )}
    </Box>
  );
};

export default Item;
