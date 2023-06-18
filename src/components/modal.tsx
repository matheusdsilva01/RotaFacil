import { FormEvent } from "react";

import {
  Box,
  Button,
  Grid,
  Modal as ModalWrapper,
  TextField
} from "@mui/material";

interface ModalProps {
  modalState: boolean;
  closeModal: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  type: "client" | "conductor";
}

const FormConductor = () => (
  <>
    <Grid item>
      <TextField label="Nome" variant="filled" name="nome" />
    </Grid>
    <Grid item>
      <TextField
        label="Número Habilitação"
        variant="filled"
        name="numeroHabilitacao"
      />
    </Grid>
    <Grid item>
      <TextField
        label="Categoria Habilitação"
        variant="filled"
        name="catergoriaHabilitacao"
      />
    </Grid>
    <Grid item>
      <TextField
        label="Vencimento Habilitação"
        variant="filled"
        name="vencimentoHabilitacao"
        type="date"
      />
    </Grid>
  </>
);

const FormClient = () => (
  <>
    <Grid item>
      <TextField
        variant="filled"
        label="Número Documento"
        name="numeroDocumento"
      />
    </Grid>
    <Grid item>
      <TextField variant="filled" label="Tipo Documento" name="tipoDocumento" />
    </Grid>
    <Grid item>
      <TextField variant="filled" label="Nome" name="nome" />
    </Grid>
    <Grid item>
      <TextField variant="filled" label="Logradouro" name="logradouro" />
    </Grid>
    <Grid item>
      <TextField variant="filled" label="Número" name="numero" />
    </Grid>
    <Grid item>
      <TextField variant="filled" label="Bairro" name="bairro" />
    </Grid>
    <Grid item>
      <TextField variant="filled" label="Cidade" name="cidade" />
    </Grid>
    <Grid item>
      <TextField variant="filled" label="UF" name="uf" />
    </Grid>
  </>
);

const Modal = ({ modalState, closeModal, onSubmit, type }: ModalProps) => {
  return (
    <ModalWrapper
      onClose={closeModal}
      open={modalState}
      component="form"
      onSubmit={onSubmit}
    >
      <Box
        sx={theme => ({
          position: "absolute",
          width: "90%",
          maxWidth: "800px",
          minHeight: "90%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "Background",
          border: "2px solid #000",
          borderRadius: "10px",
          boxShadow: "24px",
          padding: "60px 80px",
          display: "flex",
          flexDirection: "column",
          [theme.breakpoints.down(801)]: {
            gridTemplateColumns: "repeat(auto-fit, 1fr)",
            maxHeight: "100vh",
            paddingY: "25px"
          }
        })}
      >
        <Grid
          width="100%"
          height="100%"
          maxHeight="100vh"
          container
          columnGap="auto"
          rowGap={5}
          gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))"
          sx={theme => ({
            display: "grid",
            placeItems: "center",
            overflowY: "auto",
            [theme.breakpoints.down(801)]: {
              gridTemplateColumns: "repeat(auto-fit, 1fr)"
            }
          })}
        >
          {type === "client" ? <FormClient /> : <FormConductor />}
        </Grid>
        <Button variant="contained" sx={{ maxWidth: "250px", m: "0 auto" }}>
          Criar
        </Button>
      </Box>
    </ModalWrapper>
  );
};

export default Modal;
