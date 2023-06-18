import { Client, Conductor } from "@/types/users";
import { Grid } from "@mui/material";

import InputForm from "./inputForm";

type UserData = Client | Conductor;

interface FormPainelProps {
  userData: UserData;
  type: "cliente" | "condutor";
}

const ClienteComponent = ({ clientData }: { clientData: Client }) => {
  return (
    <Grid maxWidth="md" container rowSpacing={2}>
      <InputForm
        label="Número Documento"
        disabled
        value={clientData.numeroDocumento}
        name="numeroDocumento"
      />
      <InputForm
        label="Tipo Documento"
        value={clientData.tipoDocumento}
        name="tipoDocumento"
      />
      <InputForm label="Nome" value={clientData.nome} name="nome" />
      <InputForm
        label="Logradouro"
        value={clientData.logradouro}
        name="logradouro"
      />
      <InputForm label="Número" value={clientData.numero} name="numero" />
      <InputForm label="Bairro" value={clientData.bairro} name="bairro" />
      <InputForm label="Cidade" value={clientData.cidade} name="cidade" />
      <InputForm label="UF" value={clientData.uf} name="uf" />
    </Grid>
  );
};

const CondutorComponent = ({ conductorData }: { conductorData: Conductor }) => {
  return (
    <Grid maxWidth="md" container rowSpacing={2}>
      <InputForm label="Nome" value={conductorData.nome} name="nome" />
      <InputForm
        label="Número Habilitação"
        value={conductorData.numeroHabilitacao}
        name="numeroHabilitacao"
      />
      <InputForm
        label="Categoria Habilitação"
        value={conductorData.catergoriaHabilitacao}
        name="catergoriaHabilitacao"
      />
      <InputForm
        label="Vencimento Habilitação"
        value={conductorData.vencimentoHabilitacao}
        name="vencimentoHabilitacao"
      />
    </Grid>
  );
};

const formPainel = ({ userData, type }: FormPainelProps) => {
  const component =
    type === "cliente" ? (
      <ClienteComponent clientData={userData as Client} />
    ) : (
      <CondutorComponent conductorData={userData as Conductor} />
    );

  return component;
};

export default formPainel;
