import { useState, useEffect } from "react";
import { Box, TextInput, Button, Space } from "@mantine/core";
const Form = (props: any) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (props.description) {
      setDescription(props.description);
    }
  }, [props.description]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (props.id) {
      props.save(props.id, description);
      return;
    }
    props.create(description);
    setDescription("");
  };
  const cancel = (e: any) => {
    e.preventDefault();
    props.cancel();
  };
  const deletetar = (e: any) => {
    e.preventDefault();
    props.delete(props.id);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center w-full">
      <Box
        sx={(theme) => ({
          justifyContent: "center",
          padding: theme.spacing.lg,
        })}
      >
        <Box className="p-4">
          <TextInput
            size="lg"
            required
            placeholder="Em que Você está trabalhando?"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </Box>

        <Box
          sx={(theme) => ({
            marginTop: theme.spacing.xs,
            display: "flex",
            justifyContent: "space-between",
          })}
        >
          <Box>
            {props.id && (
              <Button variant="subtle" uppercase onClick={deletetar}>
                Deletar
              </Button>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="outline" uppercase onClick={cancel}>
              Cancelar
            </Button>
            <Space w="sm" />
            <Button type="submit" uppercase disabled={!description}>
              Salvar
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default Form;
