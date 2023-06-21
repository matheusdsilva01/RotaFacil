import { useFormContext, Controller } from "react-hook-form";

import { createConductorFormSchema } from "@/api/schemas/schemas";
import { Grid, TextField } from "@mui/material";
import { z } from "zod";

type CreateConductorFormData = z.infer<typeof createConductorFormSchema>;

const ModelFormConductor = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext<CreateConductorFormData>();

  return (
    <>
      <Grid item>
        <Controller
          control={control}
          defaultValue=""
          name="nome"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.nome?.message}
              label="Nome"
              variant="filled"
              name="nome"
            />
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
              helperText={errors.numeroHabilitacao?.message}
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
              helperText={errors.categoriaHabilitacao?.message}
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
              helperText={errors.vencimentoHabilitacao?.message}
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
