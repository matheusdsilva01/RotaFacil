import Link from "next/link";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TypeOptions, toast } from "react-toastify";

import { api, fetcher } from "@/api";
import FormPainel from "@/components/formPainel";
import Loading from "@/components/loading";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Client, Conductor, UserType } from "@/types/users";
import { Box, Button, Container, Typography } from "@mui/material";
import useSWR from "swr";

type UserData = Client;

const PainelLayout = () => {
  const [user, setUser] = useLocalStorage<UserType>("user");
  const methods = useForm();
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
    const { id, ...oldUserData } = userData;
    const formData =
      user.type === "cliente" ? (event as Client) : (event as Conductor);

    if (JSON.stringify(oldUserData) === JSON.stringify(formData)) {
      notify("Mude seus dados para atualizar seu cadastro!!!", "info");
    } else {
      try {
        user.type === "cliente"
          ? await api.put(`/cliente/${user.id}`, {
              ...formData,
              id: userData.id
            })
          : await api.put(`/condutor/${user.id}`, {
              ...formData,
              id: userData.id
            });
        notify("Dados alterados com sucesso", "success");
      } catch (err) {
        console.log(err);
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
