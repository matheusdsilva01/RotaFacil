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
  const currentDate = new Date(conductorData.vencimentoHabilitacao);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <Grid maxWidth="md" container rowSpacing={2}>
      <InputForm disabled label="Nome" value={conductorData.nome} name="nome" />
      <InputForm
        disabled
        label="Número Habilitação"
        value={conductorData.numeroHabilitacao}
        name="numeroHabilitacao"
      />
      <InputForm
        disabled
        label="Categoria Habilitação"
        value={conductorData.catergoriaHabilitacao}
        name="catergoriaHabilitacao"
      />
      <InputForm
        type="date"
        label="Vencimento Habilitação"
        value={formattedDate}
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
