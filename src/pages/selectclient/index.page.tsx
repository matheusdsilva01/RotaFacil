import CardUser from "@/components/cardUser";
import { Box, Container, Typography } from "@mui/material";

const clients = [
  { name: "João Silva", city: "São Paulo" },
  { name: "Maria Santos", city: "Rio de Janeiro" },
  { name: "Pedro Souza", city: "Belo Horizonte" },
  { name: "Ana Oliveira", city: "Salvador" },
  { name: "Lucas Almeida", city: "Porto Alegre" }
];

const SelectClient = () => {
  function setClient(name: string, city: string) {
    console.log(name, city);
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
        {clients.map(({ name, city }) => (
          <CardUser
            key={name}
            name={name}
            city={city}
            onClick={() => setClient(name, city)}
          />
        ))}
      </Box>
    </Container>
  );
};

export default SelectClient;
