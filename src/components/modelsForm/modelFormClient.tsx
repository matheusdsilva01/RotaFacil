import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import { Grid, TextField } from "@mui/material";

const ModelFormClient = () => {
  const { control } = useFormContext();

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
            <TextField {...field} variant="filled" label="Nome" name="nome" />
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
            <TextField {...field} variant="filled" label="UF" name="uf" />
          )}
        />
      </Grid>
    </>
  );
};

export default ModelFormClient;
