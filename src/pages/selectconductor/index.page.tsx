import React from "react";

import CardUser from "@/components/cardUser";
import { Container, Typography, Box } from "@mui/material";

const conductors = [
  { name: "Emily Johnson", city: "Nova York" },
  { name: "Liam Smith", city: "Los Angeles" },
  { name: "Olivia Williams", city: "Chicago" },
  { name: "Noah Brown", city: "Miami" },
  { name: "Ava Davis", city: "San Francisco" }
];

const SelectConductor = () => {
  function setConductor(name: string, city: string) {
    console.log(name, city);
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
        {conductors.map(({ name, city }) => (
          <CardUser
            key={name}
            name={name}
            city={city}
            onClick={() => setConductor(name, city)}
          />
        ))}
      </Box>
    </Container>
  );
};

export default SelectConductor;
