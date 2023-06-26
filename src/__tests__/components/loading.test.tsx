import Loading from "@/components/loading";
import { render } from "@testing-library/react";

describe("Tests to loading component", () => {
  it("should render loading component", () => {
    const { getByTestId } = render(<Loading />);

    const componentLoading = getByTestId("loading");

    expect(componentLoading).toBeInTheDocument();
  });
});
