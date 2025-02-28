import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import RecipeDetails from "../RecipeDetails";

// Mock the dependencies
jest.mock("../../../atoms/Spinner/Spinner", () => () => <div data-testid="spinner">Loading...</div>);
jest.mock("../../../molecules/ImageWithLoader/ImageWithLoader", () => ({ src, alt }) => 
  <img src={src} alt={alt} data-testid="image-with-loader" />
);
jest.mock("../../../molecules/RecipeInfoList/RecipeInfoList", () => ({ heading, data, isLabeled }) => (
  <div data-testid={`info-list-${heading.toLowerCase()}`}>
    <h3>{heading}</h3>
    {isLabeled 
      ? data.map((item, index) => <div key={index}>{item.label}: {item.value}</div>)
      : data.map((item, index) => <div key={index}>{item}</div>)
    }
  </div>
));
jest.mock("../../../atoms/ImageDownloader/ImageDownloader", () => ({ fileUrl, fileName }) => 
  <button data-testid="image-downloader">Download {fileName}</button>
);

jest.mock("../../../config/base-config", () => ({
  BASE_URL: "https://api.example.com/recipes"
}));

import API_CONFIG from "../../../config/base-config";

global.fetch = jest.fn();

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
    fetch.mockClear();
  });

  it("shows loading spinner initially", () => {
    fetch.mockImplementationOnce(() => new Promise(() => {}));
    
    renderWithRouter("1");
    
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("fetches and displays recipe details successfully", async () => {
    const mockRecipe = {
      id: 1,
      name: "Spaghetti Carbonara",
      cuisine: "Italian",
      prepTimeMinutes: 15,
      cookTimeMinutes: 20,
      servings: 4,
      difficulty: "Medium",
      caloriesPerServing: 650,
      rating: 4.8,
      reviewCount: 245,
      ingredients: [
        "400g spaghetti",
        "200g pancetta",
        "4 large eggs",
        "100g Parmesan cheese",
        "2 cloves garlic",
        "Black pepper"
      ],
      instructions: [
        "Boil pasta in salted water",
        "Fry pancetta until crispy",
        "Mix eggs, cheese, and pepper in a bowl",
        "Combine all ingredients and stir quickly",
        "Serve immediately with extra cheese"
      ],
      image: "https://example.com/carbonara.jpg"
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecipe
    });

    renderWithRouter("1");

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(`${API_CONFIG.BASE_URL}/1`);

    await waitFor(() => expect(screen.queryByTestId("spinner")).not.toBeInTheDocument());
    
    // Check heading
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Spaghetti Carbonara");
    
    const detailsSection = screen.getByTestId("info-list-details");
    expect(detailsSection).toBeInTheDocument();
    expect(detailsSection).toHaveTextContent("Cuisine: Italian");
    expect(detailsSection).toHaveTextContent("Prep Time: 15 minutes");
    expect(detailsSection).toHaveTextContent("Cook Time: 20 minutes");
    expect(detailsSection).toHaveTextContent("Servings: 4");
    expect(detailsSection).toHaveTextContent("Difficulty: Medium");
    expect(detailsSection).toHaveTextContent("Calories per Serving: 650");
    expect(detailsSection).toHaveTextContent("Rating: 4.8 ⭐ (245 reviews)");
    
    const ingredientsSection = screen.getByTestId("info-list-ingredients");
    expect(ingredientsSection).toBeInTheDocument();
    expect(ingredientsSection).toHaveTextContent("400g spaghetti");
    expect(ingredientsSection).toHaveTextContent("Black pepper");
    
    const stepsSection = screen.getByTestId("info-list-steps");
    expect(stepsSection).toBeInTheDocument();
    expect(stepsSection).toHaveTextContent("Boil pasta in salted water");
    expect(stepsSection).toHaveTextContent("Serve immediately with extra cheese");
    
    expect(screen.getByTestId("image-with-loader")).toHaveAttribute("src", mockRecipe.image);
    expect(screen.getByTestId("image-with-loader")).toHaveAttribute("alt", mockRecipe.name);
    expect(screen.getByTestId("image-downloader")).toHaveTextContent("Download Spaghetti Carbonara.jpg");
  });

  it("handles API error gracefully", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));
    
    renderWithRouter("1");
    
    await waitFor(() => expect(screen.getByText("Network error")).toBeInTheDocument());
    expect(screen.getByText("Network error")).toHaveClass("error-message");
  });

  it("handles bad API response gracefully", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });
    
    renderWithRouter("1");
    
    await waitFor(() => expect(screen.getByText("Failed to fetch recipe")).toBeInTheDocument());
    expect(screen.getByText("Failed to fetch recipe")).toHaveClass("error-message");
  });

  it("triggers a new fetch when recipe ID changes", async () => {
    const { rerender } = renderWithRouter("1");
    
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(`${API_CONFIG.BASE_URL}/1`);
    
    fetch.mockClear();
    
    rerender(
      <MemoryRouter initialEntries={[`/recipe/2`]}>
        <Routes>
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </MemoryRouter>
    );
    
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(`${API_CONFIG.BASE_URL}/2`);
  });
});