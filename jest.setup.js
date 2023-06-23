import "@testing-library/jest-dom/extend-expect";

jest.mock("next/navigation", () => require("next-router-mock"));
jest.mock("next/router", () => require("next-router-mock"));
