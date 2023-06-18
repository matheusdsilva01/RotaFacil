export const formatKilometer = (number: number) =>
  new Intl.NumberFormat("en-US", {
    unitDisplay: "short",
    unit: "kilometer",
    style: "unit"
  }).format(number);
