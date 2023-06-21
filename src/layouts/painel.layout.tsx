import Link from "next/link";
import { useRouter as useNavigation } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TypeOptions, toast } from "react-toastify";

import { api, fetcher } from "@/api";
import {
  editClientFormSchema,
  editConductorFormSchema
} from "@/api/schemas/schemas";
import FormPainel from "@/components/formPainel";
import Loading from "@/components/loading";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Client, Conductor, UserType } from "@/types/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Typography } from "@mui/material";
import useSWR from "swr";

type UserData = Client | Conductor;

const PainelLayout = () => {
  const [user, setUser] = useLocalStorage<UserType>("user");
  const navigation = useNavigation();
  const methods = useForm({
    resolver:
      user && user.type === "cliente"
        ? zodResolver(editClientFormSchema)
        : zodResolver(editConductorFormSchema)
  });
  const { handleSubmit } = methods;

  const { data: userData, isLoading } = useSWR<UserData>(
    `/${user?.type}/${user?.id}`,
    fetcher
  );

  if (isLoading || !user || !userData) {
    return <Loading />;
  }

  const notify = (message: string, type?: TypeOptions) =>
    toast(message, { type });

  const onSubmit = async (event: any) => {
    if (user.type === "cliente") {
      const { id, ...oldUserData } = userData;
      const formData = event as Client;

      if (JSON.stringify(oldUserData) === JSON.stringify(formData)) {
        notify("Mude seus dados para atualizar seu cadastro!!!", "info");
      } else {
        try {
          await api.put(`/cliente/${user.id}`, {
            ...formData,
            id: userData.id
          });
          notify("Dados alterados com sucesso", "success");
          navigation.push("/selectclient");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      const { vencimentoHabilitacao } = userData as Conductor;
      const formData = event as Conductor;
      if (
        new Date(vencimentoHabilitacao).toISOString() ===
        new Date(formData.vencimentoHabilitacao + "T00:00:00").toISOString()
      ) {
        notify("Mude seus dados para atualizar seu cadastro!!!", "info");
      } else {
        try {
          await api.put(`/condutor/${user.id}`, {
            ...formData,
            id: userData.id
          });
          notify("Dados alterados com sucesso", "success");
          navigation.push("/selectconductor");
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Container
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
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
            type="submit"
          >
            Atualizar dados
          </Button>
        </Box>
      </Container>
    </FormProvider>
  );
};

export default PainelLayout;
