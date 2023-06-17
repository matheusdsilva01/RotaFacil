import { useRouter } from "next/navigation";

import CardUser from "@/components/cardUser";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Client } from "@/types/users";
import { Box, Container, Typography } from "@mui/material";
interface selectClientLayoutProps {
  clients: Client[];
}
const SelectclientLayout = ({ clients }: selectClientLayoutProps) => {
  const router = useRouter();
  const [user, setUser] = useLocalStorage("user");

  function setClient(id: number) {
    const client = clients.find(client => client.id === id);
    if (client) {
      setUser({ id: client.id, type: "cliente" });
      router.push("/painel");
    }
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ height: "calc(100vh - 100px)", boxShadow: 1, mt: 4 }}
    >
      <Typography fontSize={32} fontWeight="bold" ml={2}>
        Selecione um cliente
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
        {clients.map(({ nome, cidade, id }) => (
          <CardUser
            key={id}
            nome={nome}
            additionalInfo={`Cidade: ${cidade}`}
            onClick={() => setClient(id)}
          />
        ))}
      </Box>
    </Container>
  );
};

export default SelectclientLayout;
