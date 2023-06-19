import { useFormContext, Controller } from "react-hook-form";

import { Grid, TextField } from "@mui/material";

const ModelFormConductor = () => {
  const { control } = useFormContext();

  return (
    <>
      <Grid item>
        <Controller
          control={control}
          defaultValue=""
          name="nome"
          render={({ field }) => (
            <TextField {...field} label="Nome" variant="filled" name="nome" />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          defaultValue=""
          name="numeroHabilitacao"
          render={({ field }) => (
            <TextField
              {...field}
              label="Número Habilitação"
              variant="filled"
              name="numeroHabilitacao"
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          defaultValue=""
          name="categoriaHabilitacao"
          render={({ field }) => (
            <TextField
              {...field}
              label="Categoria Habilitação"
              variant="filled"
              name="categoriaHabilitacao"
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          defaultValue=""
          name="vencimentoHabilitacao"
          render={({ field }) => (
            <TextField
              {...field}
              label="Vencimento Habilitação"
              variant="filled"
              name="vencimentoHabilitacao"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
    </>
  );
};

export default ModelFormConductor;
