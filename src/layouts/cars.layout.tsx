import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { TypeOptions, toast } from "react-toastify";

import { api } from "@/api";
import { createCarFormSchema } from "@/api/schemas/schemas";
import CardCar from "@/components/cardCar";
import Modal from "@/components/modal";
import ModelFormCar from "@/components/modelsForm/modelFormCar";
import { Car } from "@/types/cars";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Typography } from "@mui/material";

interface CarsLayoutProps {
  cars: Car[];
}
const CarsLayout = ({ cars }: CarsLayoutProps) => {
  const [modalState, setModalState] = useState(false);
  const methods = useForm({ resolver: zodResolver(createCarFormSchema) });
  const route = useRouter();
  const { handleSubmit } = methods;
  const notify = (message: string, type?: TypeOptions) =>
    toast(message, { type });

  const refreshData = () => {
    route.replace(route.asPath);
  };

  function closeModal() {
    setModalState(false);
  }

  async function onSubmit(values: FieldValues) {
    try {
      await api.post("/veiculo", values);
      notify("Veiculo criado com sucesso!!!", "success");
      refreshData();
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  }

  async function deleteUser(event: MouseEvent<HTMLButtonElement>, id: number) {
    event.stopPropagation();
    try {
      await api.delete(`/veiculo/${id}`, { data: { id } });
      notify("Veiculo deletado com sucesso!!!", "warning");
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
      sx={{
        minHeight: "calc(100vh - 100px)",
        boxShadow: 1,
        py: 2,
        overflow: "auto"
      }}
    >
      {cars.length > 0 ? (
        <>
          <Typography fontSize={32} fontWeight="bold" ml={2}>
            Crie ou selecione um carro para editar:
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
            {cars.map(car => (
              <CardCar key={car.id} deleteCar={deleteUser} car={car} />
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
            Sem veículos no sistema, crie um veículo
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
        <Button
          color="primary"
          variant="contained"
          sx={{ paddingY: 1, paddingX: 3, width: 208 }}
          onClick={() => setModalState(true)}
        >
          Adicionar veículo
        </Button>
      </Box>
      <FormProvider {...methods}>
        <Modal
          closeModal={closeModal}
          modalState={modalState}
          onSubmit={handleSubmit(onSubmit)}
        >
          <ModelFormCar />
        </Modal>
      </FormProvider>
    </Container>
  );
};

export default CarsLayout;
