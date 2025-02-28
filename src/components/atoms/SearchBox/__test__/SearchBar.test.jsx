import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

global.fetch = jest.fn();

describe("SearchBar Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, name: "Spaghetti Carbonara" }]),
      })
    );
    useNavigate.mockReturnValue(mockNavigate);
  });

  test("renders search input field", () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SearchBar />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Search recipes...")).toBeInTheDocument();
  });

  test("does not fetch recipes when input is less than 3 characters", async () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search recipes...");
    fireEvent.change(input, { target: { value: "Sp" } });

    await waitFor(() => {
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  test("fetches and displays results when typing 3+ characters", async () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search recipes...");
    fireEvent.change(input, { target: { value: "Spa" } });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/search=Spa/));
      expect(screen.getByText("Spaghetti Carbonara")).toBeInTheDocument();
    });
  });

  test("handles API error gracefully", async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error("API failure")));

    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search recipes...");
    fireEvent.change(input, { target: { value: "Spa" } });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    // Ensuring it does not break or show undefined results
    expect(screen.queryByText("Spaghetti Carbonara")).not.toBeInTheDocument();
  });
});
