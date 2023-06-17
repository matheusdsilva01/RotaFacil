import { useEffect, useState } from "react";

import { api } from "@/api";
import FormPainel from "@/components/formPainel";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Client, UserType } from "@/types/users";
import { Container } from "@mui/material";

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
      <FormPainel type={user.type} userData={userData} />
    </Container>
  );
};

export default PainelLayout;
