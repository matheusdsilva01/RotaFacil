import { api } from "@/api";
import SelectconductorLayout from "@/layouts/selectconductor.layout";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/api", () => ({
  api: {
    delete: jest.fn()
  }
}));

describe("test to selectconductor layout", () => {
  const conductors = [
    {
      id: 1,
      nome: "John Doe",
      numeroHabilitacao: "123456789",
      catergoriaHabilitacao: "A",
      vencimentoHabilitacao: "2023-06-23T12:58:00"
    },
    {
      id: 2,
      nome: "Jane Smith",
      numeroHabilitacao: "987654321",
      catergoriaHabilitacao: "B",
      vencimentoHabilitacao: "2024-08-15T09:30:00"
    },
    {
      id: 3,
      nome: "Mike Johnson",
      numeroHabilitacao: "456789123",
      catergoriaHabilitacao: "C",
      vencimentoHabilitacao: "2023-12-01T14:20:00"
    },
    {
      id: 4,
      nome: "Emily Davis",
      numeroHabilitacao: "789123456",
      catergoriaHabilitacao: "A",
      vencimentoHabilitacao: "2025-04-10T11:45:00"
    },
    {
      id: 5,
      nome: "David Wilson",
      numeroHabilitacao: "321654987",
      catergoriaHabilitacao: "B",
      vencimentoHabilitacao: "2023-09-28T16:10:00"
    }
  ];

  it("should render component selectconductor", () => {
    const { getByText } = render(
      <SelectconductorLayout conductors={conductors} />
    );
    const text = getByText(/Selecione um condutor:/i);
    expect(text).toBeInTheDocument();
  });

  it("should render selectconductor page without data", () => {
    const noConductors: any = [];

    const { getByText } = render(
      <SelectconductorLayout conductors={noConductors} />
    );
    const messageWithoutData = getByText(
      /Sem condutores no sistema, crie um condutor/i
    );
    expect(messageWithoutData).toBeInTheDocument();
  });

  it("should open modal create conductor", async () => {
    const { getByRole } = render(
      <SelectconductorLayout conductors={conductors} />
    );
    const btn = getByRole("button", {
      name: /criar condutor/i
    });
    await userEvent.click(btn);
    const inputLicenseNumber = getByRole("textbox", {
      name: /número habilitação/i
    });
    expect(inputLicenseNumber).toBeInTheDocument();
  });

  it("call function delete user", async () => {
    const { getAllByRole } = render(
      <SelectconductorLayout conductors={conductors} />
    );

    const deleteButtons = getAllByRole("button", {
      // @ts-ignore
      "aria-haspopup": "true"
    });

    await userEvent.click(deleteButtons[0]);
    expect(api.delete).toHaveBeenCalledWith(`/condutor/${conductors[0].id}`, {
      data: { id: conductors[0].id }
    });
  });

  it("should close modal", async () => {
    const { getByRole } = render(
      <SelectconductorLayout conductors={conductors} />
    );
    const btn = getByRole("button", {
      name: /criar condutor/i
    });
    await userEvent.click(btn);
    const inputNumberDocument = getByRole("textbox", {
      name: /número habilitação/i
    });
    await userEvent.keyboard("{Escape}");
    expect(inputNumberDocument).not.toBeInTheDocument();
  });
});
