import { api } from "@/api";
import SelectclientLayout from "@/layouts/selectclient.layout";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/api", () => ({
  api: {
    delete: jest.fn()
  }
}));

describe("select client", () => {
  const clients = [
    {
      id: 1,
      numeroDocumento: "123456789",
      tipoDocumento: "RG",
      nome: "João da Silva",
      logradouro: "Rua das Flores",
      numero: "123",
      bairro: "Centro",
      cidade: "São Paulo",
      uf: "SP"
    },
    {
      id: 2,
      numeroDocumento: "987654321",
      tipoDocumento: "CPF",
      nome: "Maria Santos",
      logradouro: "Avenida das Palmeiras",
      numero: "456",
      bairro: "Jardins",
      cidade: "Rio de Janeiro",
      uf: "RJ"
    },
    {
      id: 3,
      numeroDocumento: "543216789",
      tipoDocumento: "RG",
      nome: "Pedro Oliveira",
      logradouro: "Rua dos Pinheiros",
      numero: "789",
      bairro: "Vila Madalena",
      cidade: "São Paulo",
      uf: "SP"
    },
    {
      id: 4,
      numeroDocumento: "654321987",
      tipoDocumento: "CPF",
      nome: "Ana Pereira",
      logradouro: "Rua das Acácias",
      numero: "321",
      bairro: "Botafogo",
      cidade: "Rio de Janeiro",
      uf: "RJ"
    },
    {
      id: 5,
      numeroDocumento: "987123654",
      tipoDocumento: "RG",
      nome: "Carlos Ferreira",
      logradouro: "Avenida dos Girassóis",
      numero: "654",
      bairro: "Centro",
      cidade: "São Paulo",
      uf: "SP"
    }
  ];
  it("should render selectclient page", () => {
    const { getByText } = render(<SelectclientLayout clients={clients} />);
    const homeText = getByText(/Selecione um cliente:/i);
    expect(homeText).toBeInTheDocument();
  });

  it("should render selectclient page without data", () => {
    const noClients: any = [];
    const { getByText } = render(<SelectclientLayout clients={noClients} />);
    const messageWithoutData = getByText(
      /Sem clientes no sistema, crie um cliente/i
    );
    expect(messageWithoutData).toBeInTheDocument();
  });

  it("should open modal create client", async () => {
    const { getByRole } = render(<SelectclientLayout clients={clients} />);
    const btn = getByRole("button", {
      name: /criar cliente/i
    });
    await userEvent.click(btn);
    const inputNumberDocument = getByRole("textbox", {
      name: /número documento/i
    });
    expect(inputNumberDocument).toBeInTheDocument();
  });

  it("call function delete user", async () => {
    const { getAllByRole } = render(<SelectclientLayout clients={clients} />);

    const deleteButtons = getAllByRole("button", {
      // @ts-ignore
      "aria-haspopup": "true"
    });

    await userEvent.click(deleteButtons[0]);
    expect(api.delete).toHaveBeenCalledWith(`/cliente/${clients[0].id}`, {
      data: { id: clients[0].id }
    });
  });

  it("should close modal", async () => {
    const { getByRole } = render(<SelectclientLayout clients={clients} />);
    const btn = getByRole("button", {
      name: /criar cliente/i
    });
    await userEvent.click(btn);
    const inputNumberDocument = getByRole("textbox", {
      name: /número documento/i
    });
    await userEvent.keyboard("{Escape}");
    expect(inputNumberDocument).not.toBeInTheDocument();
  });
});
