import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import API_CONFIG from "../../../config/base-config";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([{ id: 1, name: "Spaghetti Carbonara", cuisine: "Italian" }]),
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("SearchBar Component", () => {
  test("renders search input", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search recipes...");
    expect(input).toBeInTheDocument();
  });

  test("updates query when typing", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search recipes...");
    fireEvent.change(input, { target: { value: "Pasta" } });

    expect(input.value).toBe("Pasta");
  });

  test("fetches and displays results when typing", async () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search recipes...");
    fireEvent.change(input, { target: { value: "Spa" } });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("search=Spa"));
      expect(screen.getByText("Spaghetti Carbonara")).toBeInTheDocument();
    });
  });

  test("navigates to recipe page on selection", async () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search recipes...");
    fireEvent.change(input, { target: { value: "Spa" } });

    await waitFor(() => {
      const recipe = screen.getByText("Spaghetti Carbonara");
      fireEvent.click(recipe);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/recipe/1");
  });
});
