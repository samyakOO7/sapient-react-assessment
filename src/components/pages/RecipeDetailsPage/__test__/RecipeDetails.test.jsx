import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RecipeDetails from "../RecipeDetails";
import { API_CONFIG } from "../../../config/base-config";


jest.mock("../../../atoms/Spinner/Spinner", () => () => <div data-testid="spinner" />);

global.fetch = jest.fn();

const mockRecipe = {
  id: "1",
  name: "Pasta",
  cuisine: "Italian",
  image: "pasta.jpg",
  ingredients: ["Tomato", "Garlic", "Basil"],
  instructions: ["Boil water", "Add pasta", "Serve hot"],
};

const renderWithRouter = (id) => {
  return render(
    <MemoryRouter initialEntries={[`/recipe/${id}`]}>
      <Routes>
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("RecipeDetails Component", () => {
  beforeEach(() => {
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockRecipe),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Spinner while loading", async () => {
    fetch.mockImplementationOnce(() => new Promise(() => {})); // Mock pending fetch
    renderWithRouter("1");

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("fetches and displays recipe details", async () => {
    renderWithRouter("1");

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    await waitFor(() => 
        expect(fetch).toHaveBeenCalledWith(`${API_CONFIG.BASE_URL}/1`)
      );      

    expect(screen.getByText("Pasta")).toBeInTheDocument();
    expect(screen.getByText("Cuisine: Italian")).toBeInTheDocument();
    expect(screen.getByAltText("Pasta")).toHaveAttribute("src", "pasta.jpg");

    expect(screen.getByText("Ingredients")).toBeInTheDocument();
    expect(screen.getByText("Tomato")).toBeInTheDocument();
    expect(screen.getByText("Garlic")).toBeInTheDocument();
    expect(screen.getByText("Basil")).toBeInTheDocument();

    expect(screen.getByText("Steps")).toBeInTheDocument();
    expect(screen.getByText("Boil water")).toBeInTheDocument();
    expect(screen.getByText("Add pasta")).toBeInTheDocument();
    expect(screen.getByText("Serve hot")).toBeInTheDocument();
  });

  test("handles fetch error gracefully", async () => {
    fetch.mockRejectedValueOnce(new Error("Failed to fetch"));

    renderWithRouter("1");

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
