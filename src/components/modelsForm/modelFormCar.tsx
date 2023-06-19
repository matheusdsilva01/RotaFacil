import { useFormContext, Controller } from "react-hook-form";

import { Grid, TextField } from "@mui/material";

const ModelFormCar = () => {
  const { control } = useFormContext();

  return (
    <>
      <Grid item>
        <Controller
          defaultValue=""
          control={control}
          name="placa"
          render={({ field }) => (
            <TextField {...field} variant="filled" label="placa" name="placa" />
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
