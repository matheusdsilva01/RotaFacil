import Home from "@/pages/index.page";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("home", () => {
  it("should render home page", () => {
    const { getByText } = render(<Home />);
    const textWelcome = getByText(/Bem vindo ao Rota Fácil!/i);

    expect(textWelcome).toBeInTheDocument();
  });
});
