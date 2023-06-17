import { useRouter } from "next/navigation";

import CardUser from "@/components/cardUser";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Conductor } from "@/types/users";
import { Container, Typography, Box } from "@mui/material";

interface selectConductorLayoutProps {
  conductors: Conductor[];
}

const SelectconductorLayout = ({ conductors }: selectConductorLayoutProps) => {
  const [user, setUser] = useLocalStorage("user");
  const router = useRouter();

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
    </Container>
  );
};

export default SelectconductorLayout;
