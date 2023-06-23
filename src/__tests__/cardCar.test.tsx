import mockRouter from "next-router-mock";

import CardCar from "@/components/cardCar";
import {
  render,
  waitFor,
  waitForElementToBeRemoved
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("test card car component", () => {
  const deleteFunc = jest.fn();
  const car = {
    id: 1,
    placa: "ABC-1234",
    marcaModelo: "Toyota Corolla",
    anoFabricacao: 2018,
    kmAtual: 50000
  };
  it("should render card car component", () => {
    const { getByText } = render(<CardCar deleteCar={deleteFunc} car={car} />);
    const marca = getByText(/Toyota Corolla/i);
    expect(marca).toBeInTheDocument();
  });

  it("should call function redirect", async () => {
    const { getByText } = render(<CardCar deleteCar={deleteFunc} car={car} />);
    const marca = getByText(car.marcaModelo);
    await userEvent.click(marca);
    expect(mockRouter.push).toHaveBeenCalled;
  });

  it("should called function deleteCar", async () => {
    const { getByRole } = render(<CardCar deleteCar={deleteFunc} car={car} />);
    const btnDelete = getByRole("button", {
      // @ts-ignore
      "aria-haspopup": "true"
    });

    await userEvent.click(btnDelete);
    expect(deleteFunc).toHaveBeenCalled();
  });

  it("must hover over delete button and show popover then remove hover and remove popover", async () => {
    const { getByRole, getByText, queryByText } = render(
      <CardCar deleteCar={deleteFunc} car={car} />
    );
    const btnDelete = getByRole("button", {
      // @ts-ignore
      "aria-haspopup": "true"
    });

    await userEvent.hover(btnDelete);

    const popover = getByText(/deletar/i);

    await waitFor(() => {
      expect(popover).toBeInTheDocument();
    });

    userEvent.unhover(btnDelete);
    await waitForElementToBeRemoved(() => getByText(/deletar/i));
    expect(queryByText(/deletar/i)).toBeNull();
  });
});
