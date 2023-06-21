import { useFormContext, Controller } from "react-hook-form";

import { createCarFormSchema } from "@/api/schemas/schemas";
import { Grid, TextField } from "@mui/material";
import { z } from "zod";

type CreateCarFormData = z.infer<typeof createCarFormSchema>;

const ModelFormCar = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext<CreateCarFormData>();

  return (
    <>
      <Grid item>
        <Controller
          defaultValue=""
          control={control}
          name="placa"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.placa?.message}
              variant="filled"
              label="placa"
              name="placa"
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          defaultValue=""
          control={control}
          name="anoFabricacao"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.anoFabricacao?.message}
              type="number"
              inputMode="numeric"
              variant="filled"
              label="Ano de Fabricação"
              name="anoFabricacao"
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          defaultValue=""
          control={control}
          name="marcaModelo"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.marcaModelo?.message}
              variant="filled"
              label="Marca ou modelo"
              name="marcaModelo"
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          defaultValue=""
          control={control}
          name="kmAtual"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.kmAtual?.message}
              type="number"
              inputMode="numeric"
              variant="filled"
              label="Km Atual"
              name="kmAtual"
            />
          )}
        />
      </Grid>
    </>
  );
};

export default ModelFormCar;
