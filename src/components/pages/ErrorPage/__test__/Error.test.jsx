import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Error from "../Error";

const mockNavigate = jest.fn();
jest.resetModules();
jest.clearAllMocks();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Error Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear(); 
  });

  test("renders 404 error message", () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });

  test("navigates to home on button click", () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    const button = screen.getByText("Go Home");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
