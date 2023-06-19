import { useRouter } from "next/router";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { api, fetcher } from "@/api";
import Loading from "@/components/loading";
import { Car } from "@/types/cars";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import useSWR from "swr";

const PageEditCar = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: car, isLoading } = useSWR<Car>(
    id && `/veiculo/${id}`,
    fetcher,
    {
      revalidateOnFocus: false
    }
  );

  const { control, handleSubmit } = useForm<any>();
  const notify = (message: string) => toast(message, { type: "success" });
  async function onSubmit(values: FieldValues) {
    const response = await api.put(`/veiculo/${id}`, { id, ...values });
    notify("Veículo editado com sucesso!!!");
  }

  if (isLoading || !id) {
    return <Loading />;
  }

  return (
    <Container
      maxWidth="xl"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ minHeight: "calc(100vh - 100px)", boxShadow: 1, py: 2 }}
    >
      <Typography fontSize={32} fontWeight="bold" ml={2}>
        Edite o veículo
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
        <Controller
          defaultValue={car?.marcaModelo}
          render={({ field }) => (
            <TextField
              {...field}
              label="Marca ou modelo"
              InputLabelProps={{ shrink: true }}
            />
          )}
          name="marcaModelo"
          control={control}
        />
        <Controller
          defaultValue={car?.anoFabricacao}
          render={({ field }) => (
            <TextField
              {...field}
              label="anoFabricacao"
              InputLabelProps={{ shrink: true }}
            />
          )}
          name="anoFabricacao"
          control={control}
        />
        <Controller
          defaultValue={car?.kmAtual}
          render={({ field }) => (
            <TextField
              label="Kilometrogem"
              {...field}
              InputLabelProps={{ shrink: true }}
            />
          )}
          name="kmAtual"
          control={control}
        />
      </Box>
      <Box sx={{ float: "right", p: "10px 5px", mt: 5 }}>
        <Button
          color="primary"
          variant="contained"
          sx={{ paddingY: 1, paddingX: 3, width: 208 }}
          type="submit"
        >
          Editar
        </Button>
      </Box>
    </Container>
  );
};

export default PageEditCar;
