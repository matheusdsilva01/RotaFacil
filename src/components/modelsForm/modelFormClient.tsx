import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import { createClientFormSchema } from "@/api/schemas/schemas";
import { Grid, TextField } from "@mui/material";
import { z } from "zod";

type CreateClientFormData = z.infer<typeof createClientFormSchema>;

const ModelFormClient = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext<CreateClientFormData>();

  return (
    <>
      <Grid item>
        <Controller
          defaultValue=""
          control={control}
          name="numeroDocumento"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.numeroDocumento?.message}
              variant="filled"
              label="Número Documento"
              name="numeroDocumento"
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          defaultValue=""
          control={control}
          name="tipoDocumento"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.tipoDocumento?.message}
              variant="filled"
              label="Tipo Documento"
              name="tipoDocumento"
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          defaultValue=""
          control={control}
          name="nome"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.nome?.message}
              variant="filled"
              label="Nome"
              name="nome"
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          defaultValue=""
          control={control}
          name="logradouro"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.logradouro?.message}
              variant="filled"
              label="Logradouro"
              name="logradouro"
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          defaultValue=""
          control={control}
          name="numero"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.numero?.message}
              variant="filled"
              label="Número"
              name="numero"
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          defaultValue=""
          control={control}
          name="bairro"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.bairro?.message}
              variant="filled"
              label="Bairro"
              name="bairro"
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          defaultValue=""
          control={control}
          name="cidade"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.cidade?.message}
              variant="filled"
              label="Cidade"
              name="cidade"
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          defaultValue=""
          control={control}
          name="uf"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.uf?.message}
              variant="filled"
              label="UF"
              name="uf"
            />
          )}
        />
      </Grid>
    </>
  );
};

export default ModelFormClient;
