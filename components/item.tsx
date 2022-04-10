import { useState } from "react";
import { ActionIcon, Box, Text, Space } from "@mantine/core";
import { AiOutlineCheckCircle, AiFillEdit } from "react-icons/ai";
import Form from "./form";

const Item = (props: any) => {
  const [showForm, setShowForm] = useState(false);
  const [load, setLoad] = useState(false);

  async function handlerDelete(id: number) {
    await props.delete(id);
    setShowForm(false);
  }

  async function handlerSave(id: number, description: string) {
    await props.save(id, description, props.done);
    setShowForm(false);
  }
  async function handlerDone(id: number, done: boolean) {
    setLoad(true);
    await props.save(id, props.description, done);
    setLoad(false);
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
              loading={load}
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
