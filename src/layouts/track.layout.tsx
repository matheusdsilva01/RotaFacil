import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, FieldValues, FormProvider } from "react-hook-form";
import { TypeOptions, toast } from "react-toastify";

import { api } from "@/api";
import { createTrackFormSchema } from "@/api/schemas/schemas";
import Modal from "@/components/modal";
import ModelFormTrack from "@/components/modelsForm/modelFormTrack";
import TrackTable from "@/components/tableTable";
import { Track } from "@/types/tracks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Box, Button, Typography } from "@mui/material";
import { z } from "zod";

interface TrackLayoutProps {
  tracks: Track[];
}

type CreateTrackFormData = z.infer<typeof createTrackFormSchema>;

const TrackLayout = ({ tracks }: TrackLayoutProps) => {
  const [modalState, setModalState] = useState(false);
  const methods = useForm<CreateTrackFormData>({
    resolver: zodResolver(createTrackFormSchema)
  });
  const { handleSubmit } = methods;
  const route = useRouter();
  const notify = (message: string, type?: TypeOptions) =>
    toast(message, { type });

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
      notify("Deslocamento criado com sucesso!!!", "success");
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
      {tracks.length > 0 ? (
        <Box sx={{ overflowX: "auto" }}>
          <TrackTable tracks={tracks} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            mt: 4
          }}
        >
          <Typography fontWeight={600} fontSize={32}>
            Sem deslocamentos no sistema, crie um deslocamento
          </Typography>
        </Box>
      )}
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
