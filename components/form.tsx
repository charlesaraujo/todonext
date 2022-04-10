import { useState, useEffect } from "react";
import { Box, TextInput, Button, Space, LoadingOverlay } from "@mantine/core";
const Form = (props: any) => {
  const [description, setDescription] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (props.description) {
      setDescription(props.description);
    }
  }, [props.description]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoad(true);
    if (props.id) {
      await props.save(props.id, description);
      setLoad(false);
      return;
    }
    await props.create(description);
    setDescription("");
    setLoad(false);
  };
  const cancel = (e: any) => {
    e.preventDefault();
    props.cancel();
  };
  const deletetar = async (e: any) => {
    setLoad(true);
    e.preventDefault();
    await props.delete(props.id);
    setLoad(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={(theme) => ({
          justifyContent: "center",
          position: "relative",
          padding: theme.spacing.lg,
        })}
      >
        <LoadingOverlay
          sx={(theme) => ({
            borderRadius: theme.radius.md,
          })}
          visible={load}
        />
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
