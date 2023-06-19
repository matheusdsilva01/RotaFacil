import { FormEvent } from "react";

import { Box, Button, Grid, Modal as ModalWrapper } from "@mui/material";

import ModelFormClient from "./modelsForm/modelFormClient";
import ModelFormConductor from "./modelsForm/modelFormConductor";

interface ModalProps {
  modalState: boolean;
  closeModal: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  type: "client" | "conductor";
}

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
          {type === "client" ? <ModelFormClient /> : <ModelFormConductor />}
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{ maxWidth: "250px", m: "0 auto" }}
        >
          Criar
        </Button>
      </Box>
    </ModalWrapper>
  );
};

export default Modal;
