import React from "react";
import { render, screen } from "@testing-library/react";
import RecipeInfoList from "../RecipeInfoList";

describe("RecipeInfoList Component", () => {
  test("renders title correctly", () => {
    render(<RecipeInfoList heading="Ingredients" data={[]} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Ingredients");
  });

  test("renders labeled items when isLabeled is true", () => {
    const data = [
      { label: "Cuisine", value: "Italian" },
      { label: "Prep Time", value: "30 minutes" }
    ];

    render(<RecipeInfoList heading="Details" data={data} isLabeled />);

    expect(screen.getByText("Cuisine:")).toBeInTheDocument();
    expect(screen.getByText("Italian")).toBeInTheDocument();
    expect(screen.getByText("Prep Time:")).toBeInTheDocument();
    expect(screen.getByText("30 minutes")).toBeInTheDocument();
  });

  test("renders unlabeled items when isLabeled is false", () => {
    const data = ["Tomato", "Cheese", "Basil"];

    render(<RecipeInfoList heading="Ingredients" data={data} isLabeled={false} />);

    data.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("renders empty list without errors", () => {
    render(<RecipeInfoList heading="Empty List" data={[]} />);
    expect(screen.getByRole("list")).toBeEmptyDOMElement();
  });
});
