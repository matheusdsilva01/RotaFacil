import { useRouter } from "next/navigation";
import { useState } from "react";

import CardUser from "@/components/cardUser";
import Modal from "@/components/modal";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Conductor } from "@/types/users";
import { Container, Typography, Box, Button } from "@mui/material";

interface selectConductorLayoutProps {
  conductors: Conductor[];
}

const SelectconductorLayout = ({ conductors }: selectConductorLayoutProps) => {
  const [modalState, setModalState] = useState(false);
  const [user, setUser] = useLocalStorage("user");
  const router = useRouter();

  function closeModal() {
    setModalState(false);
  }

  function setConductor(id: number) {
    const conductor = conductors.find(conduc => conduc.id === id);
    if (conductor) {
      setUser({ id: conductor.id, type: "condutor" });
      router.push("/painel");
    }
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ height: "calc(100vh - 100px)", boxShadow: 1, mt: 4 }}
    >
      <Typography fontSize={32} fontWeight="bold" ml={2}>
        Selecione um condutor
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
        {conductors.map(({ nome, catergoriaHabilitacao, id }) => (
          <CardUser
            key={id}
            nome={nome}
            additionalInfo={`CNH: ${catergoriaHabilitacao}`}
            onClick={() => setConductor(id)}
          />
        ))}
      </Box>
      <Box sx={{ float: "right", p: "10px 5px", mt: 5 }}>
        <Button
          color="primary"
          variant="contained"
          sx={{ paddingY: 1, paddingX: 3, width: 208 }}
          type="submit"
          onClick={() => setModalState(true)}
        >
          Criar Condutor
        </Button>
      </Box>
      <Modal
        closeModal={closeModal}
        modalState={modalState}
        onSubmit={() => {}}
        type="conductor"
      />
    </Container>
  );
};

export default SelectconductorLayout;
