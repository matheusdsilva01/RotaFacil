import Home from "@/pages/index.page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("home", () => {
  it("should render home page", () => {
    render(<Home />);
    const textWelcome = screen.getByText(/Bem vindo ao Rota Fácil!/i);

    expect(textWelcome).toBeInTheDocument();
  });
});
