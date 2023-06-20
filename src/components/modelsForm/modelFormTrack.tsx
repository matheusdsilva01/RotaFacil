import { Controller, useFormContext } from "react-hook-form";

import { fetcher } from "@/api";
import { Car } from "@/types/cars";
import { Client, Conductor } from "@/types/users";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import useSWR from "swr";

const modelFormTrack = () => {
  const { control } = useFormContext();
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

  return (
    <>
      <Grid item sx={{ minWidth: 180 }}>
        <Controller
          control={control}
          defaultValue=""
          name="idCliente"
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="idClient">Nome Cliente</InputLabel>
              <Select {...field} labelId="idClient" label="Id cliente">
                {clients?.map(client => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.nome}
                  </MenuItem>
                ))}
              </Select>
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
                  <MenuItem key={conductor.id} value={conductor.id}>
                    {conductor.nome}
                  </MenuItem>
                ))}
              </Select>
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
                  <MenuItem key={car.id} value={car.id}>
                    {car.marcaModelo}
                  </MenuItem>
                ))}
              </Select>
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
              label="Checklist"
              variant="filled"
              name="checklist"
            />
          )}
        />
      </Grid>
    </>
  );
};

export default modelFormTrack;
