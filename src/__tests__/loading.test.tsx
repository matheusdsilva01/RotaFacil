import Loading from "@/components/loading";
import { render, screen } from "@testing-library/react";

describe("Tests to loading component", () => {
  it("should render loading component", () => {
    render(<Loading />);

    const componentLoading = screen.getByTestId("loading");

    expect(componentLoading).toBeInTheDocument();
  });
});
