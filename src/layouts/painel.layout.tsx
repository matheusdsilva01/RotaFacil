import Link from "next/link";
import { useEffect, useState } from "react";

import { api } from "@/api";
import FormPainel from "@/components/formPainel";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Client, UserType } from "@/types/users";
import { Box, Button, Container, Typography } from "@mui/material";

type UserData = Client;

const PainelLayout = () => {
  const [user, setUser] = useLocalStorage<UserType>("user");
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    (async () => {
      const response = await api.get<UserData>(`/${user?.type}/${user?.id}`);
      setUserData(response.data);
    })();
  }, []);

  // temporary loading
  if (!userData || !user) {
    return <></>;
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "calc(100vh - 100px)",
        boxShadow: 1,
        mt: 4
      }}
    >
      <Typography fontSize={32} fontWeight="bold" py={2}>
        Seus dados:
      </Typography>
      <FormPainel type={user.type} userData={userData} />
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
          Atualizar dados
        </Button>
        <Link href={user.type === "cliente" ? "/" : "/cars"}>
          <Button
            color="secondary"
            variant="contained"
            sx={{ paddingY: 1, paddingX: 3, width: 208 }}
          >
            {user.type === "cliente" ? "Criar deslocamento" : "Ver veículos"}
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default PainelLayout;
