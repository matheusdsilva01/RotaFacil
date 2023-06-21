import { Controller, useFormContext } from "react-hook-form";

import { fetcher } from "@/api";
import { createTrackFormSchema } from "@/api/schemas/schemas";
import { Car } from "@/types/cars";
import { Client, Conductor } from "@/types/users";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import useSWR from "swr";
import { z } from "zod";

type CreateTrackFormData = z.infer<typeof createTrackFormSchema>;

const modelFormTrack = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext<CreateTrackFormData>();
  const { data: conductors } = useSWR<Conductor[]>("/condutor", fetcher, {
    revalidateOnFocus: false
    // refreshInterval: 60
  });
  const { data: clients } = useSWR<Client[]>("/cliente", fetcher, {
    revalidateOnFocus: false
    // refreshInterval: 60
  });
  const { data: cars } = useSWR<Car[]>("/veiculo", fetcher, {
    revalidateOnFocus: false
    // refreshInterval: 60
  });
  console.log(errors);
  return (
    <>
      <Grid item sx={{ minWidth: 180 }}>
        <Controller
          control={control}
          defaultValue=""
          name="idCliente"
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="idCliente">Nome Cliente</InputLabel>
              <Select {...field} labelId="idCliente" label="Id cliente">
                {clients?.map(client => (
                  <MenuItem key={client.id} value={String(client.id)}>
                    {client.nome}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.idCliente?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid>
      <Grid item sx={{ minWidth: 180 }}>
        <Controller
          control={control}
          defaultValue=""
          name="idCondutor"
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="idCondutor">Nome Condutor</InputLabel>
              <Select {...field} labelId="idCondutor" label="Id condutor">
                {conductors?.map(conductor => (
                  <MenuItem key={conductor.id} value={String(conductor.id)}>
                    {conductor.nome}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.idCondutor?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid>
      <Grid item sx={{ minWidth: 180 }}>
        <Controller
          control={control}
          defaultValue=""
          name="idVeiculo"
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="idVeiculo">Veículo</InputLabel>
              <Select {...field} labelId="idVeiculo" label="Id car">
                {cars?.map(car => (
                  <MenuItem key={car.id} value={String(car.id)}>
                    {car.marcaModelo}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.idVeiculo?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          defaultValue=""
          name="motivo"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.motivo?.message}
              label="Motivo"
              variant="filled"
              name="motivo"
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          defaultValue=""
          name="observacao"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.observacao?.message}
              label="Observação"
              variant="filled"
              name="observacao"
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          defaultValue=""
          name="checklist"
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.checklist?.message}
              variant="filled"
              name="checklist"
              label="Checklist"
            />
          )}
        />
      </Grid>
    </>
  );
};

export default modelFormTrack;
