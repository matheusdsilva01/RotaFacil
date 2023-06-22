import Header from "@/components/header";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("header", () => {
  it("should render header component", () => {
    const { getByRole } = render(<Header />);
    const btn = getByRole("button", { name: /cliente/i });
    expect(btn).toBeInTheDocument();
  });

  it("should toggle menu", async () => {
    const { getByTestId } = render(<Header />);
    const menu = getByTestId("MenuIcon");
    await userEvent.click(menu);
    expect(menu).toBeInTheDocument();
  });
});
