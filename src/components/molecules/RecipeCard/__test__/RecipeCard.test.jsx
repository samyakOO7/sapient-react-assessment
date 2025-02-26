import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RecipeCard from "../RecipeCard";

const mockRecipe = {
  name: "Spaghetti Bolognese",
  cuisine: "Italian",
};

describe("RecipeCard Component", () => {
  test("renders recipe name and cuisine", () => {
    render(<RecipeCard recipe={mockRecipe} onClick={jest.fn()} />);
    
    expect(screen.getByText("Spaghetti Bolognese")).toBeInTheDocument();
    expect(screen.getByText("Italian")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<RecipeCard recipe={mockRecipe} onClick={handleClick} />);
    
    fireEvent.click(screen.getByText("Spaghetti Bolognese"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("has correct class names", () => {
    const { container } = render(<RecipeCard recipe={mockRecipe} onClick={jest.fn()} />);
    expect(container.firstChild).toHaveClass("recipe-card");
  });
});
