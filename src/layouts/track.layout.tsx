import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, FieldValues, FormProvider } from "react-hook-form";

import { api } from "@/api";
import Modal from "@/components/modal";
import ModelFormTrack from "@/components/modelsForm/modelFormTrack";
import TrackTable from "@/components/tableTable";
import { Track } from "@/types/tracks";
import { Container, Box, Button } from "@mui/material";

interface TrackLayoutProps {
  tracks: Track[];
}

const TrackLayout = ({ tracks }: TrackLayoutProps) => {
  const [modalState, setModalState] = useState(false);
  const methods = useForm();
  const { handleSubmit } = methods;
  const route = useRouter();

  const refreshData = () => {
    route.replace(route.asPath);
  };

  function closeModal() {
    setModalState(false);
  }

  async function onSubmit(values: FieldValues) {
    const dataForm = {
      ...values,
      inicioDeslocamento: new Date().toISOString(),
      kmInicial: 0
    };
    try {
      await api.post("/deslocamento/iniciardeslocamento", dataForm);
      refreshData();
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  }
  return (
    <Container
      maxWidth="xl"
      sx={{ p: 2, backgroundColor: "gray", overflow: "hidden" }}
    >
      <Box sx={{ overflowX: "auto" }}>
        <TrackTable tracks={tracks} />
      </Box>
      <FormProvider {...methods}>
        <Modal
          onSubmit={handleSubmit(onSubmit)}
          closeModal={closeModal}
          modalState={modalState}
        >
          <ModelFormTrack />
        </Modal>
      </FormProvider>
      <Button
        variant="contained"
        sx={{ float: "right", mt: 2 }}
        onClick={() => setModalState(true)}
      >
        Criar
      </Button>
    </Container>
  );
};

export default TrackLayout;
