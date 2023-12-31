import { useRouter as useNavigation } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { useForm, FieldValues, Controller } from "react-hook-form";
import { TypeOptions, toast } from "react-toastify";

import { fetcher, api } from "@/api";
import { editCarFormSchema } from "@/api/schemas/schemas";
import Loading from "@/components/loading";
import { Car } from "@/types/cars";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import useSWR from "swr";
import { z } from "zod";

type EditCarFormData = z.infer<typeof editCarFormSchema>;

const EditCarLayout = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = router.query;
  const { data: car, isLoading } = useSWR<Car>(
    id && `/veiculo/${id}`,
    fetcher,
    {
      revalidateOnFocus: false
    }
  );

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<EditCarFormData>({
    resolver: zodResolver(editCarFormSchema)
  });

  const notify = (message: string, type: TypeOptions) =>
    toast(message, { type });

  async function onSubmit(values: FieldValues) {
    const { id, placa, ...oldCarData } = car!;

    if (JSON.stringify(oldCarData) === JSON.stringify(values)) {
      notify("Mude seus dados para atualizar seu cadastro!!!", "info");
    } else {
      try {
        await api.put(`/veiculo/${id}`, { id, ...values });
        notify("Veículo editado com sucesso!!!", "success");
        navigation.push("/cars");
      } catch (err) {
        console.log(err);
      }
    }
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
              helperText={errors.marcaModelo?.message}
              label="Marca ou modelo"
              InputLabelProps={{ shrink: true }}
            />
          )}
          name="marcaModelo"
          control={control}
        />
        <Controller
          defaultValue={String(car?.anoFabricacao)}
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.anoFabricacao?.message}
              label="anoFabricacao"
              type="number"
              inputMode="numeric"
              InputLabelProps={{ shrink: true }}
            />
          )}
          name="anoFabricacao"
          control={control}
        />
        <Controller
          defaultValue={String(car?.kmAtual)}
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.kmAtual?.message}
              label="Kilometrogem"
              type="number"
              inputMode="numeric"
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

export default EditCarLayout;
