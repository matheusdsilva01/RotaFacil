import Link from "next/link";
import { useRouter as useNavigation } from "next/navigation";
import { useRouter } from "next/router";
import { useState, MouseEvent } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { TypeOptions, toast } from "react-toastify";

import { api } from "@/api";
import { createConductorFormSchema } from "@/api/schemas/schemas";
import CardUser from "@/components/cardUser";
import Modal from "@/components/modal";
import ModelFormConductor from "@/components/modelsForm/modelFormConductor";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Conductor } from "@/types/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Typography, Box, Button } from "@mui/material";

interface selectConductorLayoutProps {
  conductors: Conductor[];
}

const SelectconductorLayout = ({ conductors }: selectConductorLayoutProps) => {
  const [modalState, setModalState] = useState(false);
  const [user, setUser] = useLocalStorage("user");
  const route = useRouter();
  const navigation = useNavigation();
  const refreshData = () => {
    route.replace(route.asPath);
  };
  const methods = useForm({ resolver: zodResolver(createConductorFormSchema) });
  const { handleSubmit } = methods;
  const notify = (message: string, type?: TypeOptions) =>
    toast(message, { type });

  function closeModal() {
    setModalState(false);
  }

  function setConductor(id: number) {
    const conductor = conductors.find(conduc => conduc.id === id);
    if (conductor) {
      setUser({ id: conductor.id, type: "condutor" });
      navigation.push("/painel");
    }
  }

  async function onSubmit(values: FieldValues) {
    const dataForm = {
      ...values,
      vencimentoHabilitacao: new Date(
        values.vencimentoHabilitacao
      ).toISOString()
    };

    try {
      await api.post("/condutor", dataForm);
      notify("Condutor criado com sucesso!!!", "success");
      refreshData();
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  }

  const deleteUser = async (
    event: MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.stopPropagation();
    try {
      api.delete(`/condutor/${id}`, { data: { id: id } });
      notify("Condutor deletado com sucesso!!!", "warning");
      refreshData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "calc(100vh - 100px)",
        boxShadow: 1,
        mt: 4,
        overflow: "auto"
      }}
    >
      {conductors.length > 0 ? (
        <>
          <Typography fontSize={32} fontWeight="bold" ml={2}>
            Selecione um condutor:
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
            {conductors.map(({ nome, catergoriaHabilitacao, id }) => (
              <CardUser
                key={id}
                nome={nome}
                additionalInfo={`CNH: ${catergoriaHabilitacao}`}
                onClick={() => setConductor(id)}
                deleteUser={event => deleteUser(event, id)}
              />
            ))}
          </Box>
        </>
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
            Sem condutores no sistema, crie um condutor
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          float: "right",
          p: "10px 5px",
          mt: 5,
          display: "flex",
          flexWrap: "wrap",
          columnGap: 2,
          rowGap: 2
        }}
      >
        <Link href="/cars">
          <Button
            color="secondary"
            variant="contained"
            sx={{ paddingY: 1, paddingX: 3, width: 208 }}
          >
            Ver veículos
          </Button>
        </Link>
        <Button
          color="primary"
          variant="contained"
          sx={{ paddingY: 1, paddingX: 3, width: 208 }}
          type="submit"
          onClick={() => setModalState(true)}
        >
          Criar Condutor
        </Button>
      </Box>
      <FormProvider {...methods}>
        <Modal
          closeModal={closeModal}
          modalState={modalState}
          onSubmit={handleSubmit(onSubmit)}
        >
          <ModelFormConductor />
        </Modal>
      </FormProvider>
    </Container>
  );
};

export default SelectconductorLayout;
