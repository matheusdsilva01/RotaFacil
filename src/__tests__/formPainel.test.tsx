import { FormProvider, useForm } from "react-hook-form";

import FormPainel from "@/components/formPainel";
import { render } from "@testing-library/react";

describe("form painel", () => {
  const client = {
    id: 1,
    numeroDocumento: "123456789",
    tipoDocumento: "RG",
    nome: "João da Silva",
    logradouro: "Rua das Flores",
    numero: "123",
    bairro: "Centro",
    cidade: "São Paulo",
    uf: "SP"
  };
  const conductor = {
    id: 1,
    nome: "John Doe",
    numeroHabilitacao: "123456789",
    catergoriaHabilitacao: "A",
    vencimentoHabilitacao: "2023-06-23T12:58:00"
  };
  it("should render form painel to client", () => {
    const TestInput = () => {
      const methods = useForm();

      return (
        <FormProvider {...methods}>
          <FormPainel type="cliente" userData={client} />
        </FormProvider>
      );
    };
    render(<TestInput />);
  });
  it("should render form painel to conductor", () => {
    const TestInput = () => {
      const methods = useForm();

      return (
        <FormProvider {...methods}>
          <FormPainel type="condutor" userData={conductor} />
        </FormProvider>
      );
    };
    render(<TestInput />);
  });
});
