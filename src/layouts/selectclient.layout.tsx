import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import { api } from "@/api";
import CardUser from "@/components/cardUser";
import Modal from "@/components/modal";
import ModelFormClient from "@/components/modelsForm/modelFormClient";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Client } from "@/types/users";
import { Box, Button, Container, Typography } from "@mui/material";
interface selectClientLayoutProps {
  clients: Client[];
}
const SelectclientLayout = ({ clients }: selectClientLayoutProps) => {
  const [modalState, setModalState] = useState(false);
  const [user, setUser] = useLocalStorage("user");
  const router = useRouter();

  const methods = useForm();
  const { handleSubmit } = methods;

  function closeModal() {
    setModalState(false);
  }

  function setClient(id: number) {
    const client = clients.find(client => client.id === id);
    if (client) {
      setUser({ id: client.id, type: "cliente" });
      router.push("/painel");
    }
  }

  async function onSubmit(values: FieldValues) {
    const response = await api.post("/cliente", values);
    console.log(response);
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ minHeight: "calc(100vh - 100px)", boxShadow: 1, py: 2 }}
    >
      <Typography fontSize={32} fontWeight="bold" ml={2}>
        Selecione um cliente
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px 20px",
          mt: 4
        }}
      >
        {clients.map(({ nome, cidade, id }) => (
          <CardUser
            key={id}
            nome={nome}
            additionalInfo={`Cidade: ${cidade}`}
            onClick={() => setClient(id)}
          />
        ))}
      </Box>
      <Box sx={{ float: "right", p: "10px 5px", mt: 5 }}>
        <Button
          color="primary"
          variant="contained"
          sx={{ paddingY: 1, paddingX: 3, width: 208 }}
          type="submit"
          onClick={() => setModalState(true)}
        >
          Criar Cliente
        </Button>
      </Box>
      <FormProvider {...methods}>
        <Modal
          closeModal={closeModal}
          modalState={modalState}
          onSubmit={handleSubmit(onSubmit)}
        >
          <ModelFormClient />
        </Modal>
      </FormProvider>
    </Container>
  );
};

export default SelectclientLayout;
