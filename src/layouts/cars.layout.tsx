import React from "react";

import CardUser from "@/components/cardUser";
import { Cars } from "@/types/cars";
import { formatKilometer } from "@/util/formatKilometer";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Link
} from "@mui/material";

interface CarsLayoutProps {
  cars: Cars[];
}
const CarsLayout = ({ cars }: CarsLayoutProps) => {
  console.log(cars);

  return (
    <Container
      maxWidth="xl"
      sx={{ minHeight: "calc(100vh - 100px)", boxShadow: 1, py: 2 }}
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
        {cars.map(({ marcaModelo, anoFabricacao, kmAtual, id }) => (
          <Card
            key={id}
            sx={{
              width: 275,
              bgcolor: "secondary",
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
        >
          Adicionar veículo
        </Button>
      </Box>
    </Container>
  );
};

export default CarsLayout;
