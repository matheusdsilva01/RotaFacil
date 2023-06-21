import Link from "next/link";

import { Box, Button, Container, Typography } from "@mui/material";

const HomeLayout = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ display: "flex", height: "100vh" }}>
        <Box
          sx={{
            m: "auto",
            ml: 0,
            "&> * + *": {
              mt: 4
            }
          }}
        >
          <Typography sx={{ m: "auto" }} fontSize={36}>
            Bem vindo ao Rota Fácil!
          </Typography>
          <Typography>
            Aqui você poderá criar deslocamentos ou conduzir as pessoas
          </Typography>
          <Typography>
            Escolha uma das opções abaixo para usar nosso sistema e tenha acesso
            a recursos de cada função:
          </Typography>
          <Box sx={{ display: "flex", columnGap: 5 }}>
            <Link href={"/selectclient"} passHref>
              <Button
                color="primary"
                variant="contained"
                sx={{ paddingY: 2, paddingX: 5 }}
              >
                Cliente
              </Button>
            </Link>
            <Link href={"/selectconductor"} passHref>
              <Button
                color="secondary"
                variant="contained"
                sx={{ paddingY: 2, paddingX: 5 }}
              >
                Condutor
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HomeLayout;
