import { useRouter as useNavigation } from "next/navigation";
import { useRouter } from "next/router";
import { useState, MouseEvent } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import { api } from "@/api";
import Modal from "@/components/modal";
import ModelFormCar from "@/components/modelsForm/modelFormCar";
import { Car } from "@/types/cars";
import { formatKilometer } from "@/util/formatKilometer";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Popover,
  Typography
} from "@mui/material";

interface CarsLayoutProps {
  cars: Car[];
}
const CarsLayout = ({ cars }: CarsLayoutProps) => {
  const [modalState, setModalState] = useState(false);
  const methods = useForm();
  const navigation = useNavigation();
  const route = useRouter();
  const { handleSubmit } = methods;

  const refreshData = () => {
    route.replace(route.asPath);
  };

  function closeModal() {
    setModalState(false);
  }

  async function onSubmit(values: FieldValues) {
    try {
      await api.post("/veiculo", values);
      refreshData();
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  }

  async function deleteUser(event: MouseEvent<HTMLButtonElement>, id: number) {
    event.stopPropagation();
    try {
      await api.delete(`/veiculo/${id}`, { data: { id } });
      refreshData();
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  }

  // popover
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "calc(100vh - 100px)",
        boxShadow: 1,
        py: 2
      }}
    >
      <Typography fontSize={32} fontWeight="bold" ml={2}>
        Crie ou selecione um carro para editar:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px 20px",
          mt: 4
        }}
      >
        {cars.map(({ marcaModelo, anoFabricacao, kmAtual, id }) => (
          <Card
            key={id}
            onClick={() => navigation.push(`/cars/edit/${id}`)}
            sx={{
              width: 275,
              minHeight: 120,
              bgcolor: "secondary",
              position: "relative",
              ":hover": {
                boxShadow: 3
              }
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  fontSize: {
                    md: 22
                  }
                }}
                fontWeight="bold"
                noWrap
              >
                {marcaModelo}
              </Typography>
              <Typography sx={{ fontSize: { fontSize: 14, md: 16 } }}>
                Ano: {anoFabricacao}
              </Typography>
              <Typography sx={{ fontSize: { fontSize: 14, md: 16 } }}>
                Quilometragem: {formatKilometer(kmAtual)}
              </Typography>
            </CardContent>
            <Box>
              <Button
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={{
                  float: "right",
                  position: "absolute",
                  bottom: 0,
                  right: 0
                }}
                onClick={event => deleteUser(event, id)}
              >
                <DeleteIcon fontSize="small" />
              </Button>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: "none"
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography
                  sx={{ p: 1, backgroundColor: "darkred", color: "white" }}
                  lineHeight={1}
                >
                  Deletar
                </Typography>
              </Popover>
            </Box>
          </Card>
        ))}
      </Box>
      <Box
        sx={{
          float: "right",
          p: "10px 5px",
          mt: 5,
          display: "flex",
          flexWrap: "wrap",
          columnGap: 2,
          rowGap: 2
        }}
      >
        <Button
          color="primary"
          variant="contained"
          sx={{ paddingY: 1, paddingX: 3, width: 208 }}
          onClick={() => setModalState(true)}
        >
          Adicionar veículo
        </Button>
      </Box>
      <FormProvider {...methods}>
        <Modal
          closeModal={closeModal}
          modalState={modalState}
          onSubmit={handleSubmit(onSubmit)}
        >
          <ModelFormCar />
        </Modal>
      </FormProvider>
    </Container>
  );
};

export default CarsLayout;
