import { useRouter as useNavigation } from "next/navigation";
import { useRouter } from "next/router";
import { TypeOptions, toast } from "react-toastify";

import { fetcher, api } from "@/api";
import Loading from "@/components/loading";
import { Track } from "@/types/tracks";
import { formatKilometer } from "@/util/formatKilometer";
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import useSWR from "swr";

const TrackDetailLayout = () => {
  const route = useRouter();
  const navigate = useNavigation();
  const { id } = route.query;

  const notify = (message: string, type?: TypeOptions) =>
    toast(message, { type });

  const { data: track, isLoading } = useSWR<Track>(
    id && `/deslocamento/${id}`,
    fetcher
  );

  if (isLoading || !id) {
    return <Loading />;
  }

  async function deleteTrack() {
    try {
      await api.delete(`/deslocamento/${id}`, { data: { id } });
      navigate.push("/tracks");
      notify("Deslocamento deletado com sucesso!!!", "warning");
    } catch (err) {
      console.log(err);
    }
  }

  async function closeTrack() {
    try {
      await api.put(`/deslocamento/${id}/encerrardeslocamento`, {
        id,
        kmFinal: 100,
        fimDeslocamento: new Date().toISOString(),
        observacao: "Sem observação"
      });
      navigate.push("/tracks");
      notify("Deslocamento encerrado com sucesso!!", "info");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{ height: "calc(100vh - 100px)", boxShadow: 1, mt: 4 }}
      >
        <Typography fontSize={32} fontWeight="bold" ml={2}>
          Gerencie o deslocamento:
        </Typography>
        <Grid container rowSpacing={5} columnSpacing={10} mt={1}>
          <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
            <Typography fontSize={24}>
              <strong>Kilometro inicial: </strong>
              {formatKilometer(track?.kmInicial || 0)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
            <Typography fontSize={24}>
              <strong>Kilometro final: </strong>
              {formatKilometer(track?.kmFinal || 0)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
            <Typography fontSize={24}>
              <strong>Horario de inicio: </strong>
              {new Date(track?.inicioDeslocamento || "").toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
            <Typography fontSize={24}>
              <strong>Motivo: </strong>
              {track?.motivo}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
            <Typography fontSize={24}>
              <strong>Observação: </strong>
              {track?.observacao}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
            <Typography fontSize={24}>
              <strong>Checklist: </strong>
              {track?.checkList}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
            <Typography fontSize={24}>
              <strong>Id condutor: </strong>
              {track?.idCondutor}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
            <Typography fontSize={24}>
              <strong>Id veículo: </strong>
              {track?.idVeiculo}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
            <Typography fontSize={24}>
              <strong>Id cliente: </strong>
              {track?.idCliente}
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            float: "right",
            flexWrap: "wrap",
            columnGap: 2
          }}
        >
          <Button variant="contained" onClick={deleteTrack}>
            Apagar deslocamento
          </Button>
          <Button variant="contained" onClick={closeTrack}>
            Encerrar deslocamento
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default TrackDetailLayout;
