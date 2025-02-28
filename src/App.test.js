import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders home page by default", () => {
  render(<App router={MemoryRouter} />);
  expect(screen.getByText(/home/i)).toBeInTheDocument(); // Adjust based on Home component
});

test("renders error page for unknown route", () => {
  render(<App router={() => <MemoryRouter initialEntries={["/unknown-route"]} />} />);
  expect(screen.getByText(/page not found/i)).toBeInTheDocument(); // Adjust based on Error component
});

test("renders recipe details page when navigating", async () => {
  render(<App router={() => <MemoryRouter initialEntries={["/recipe/1"]} />} />);
  
  expect(screen.getByTestId("spinner")).toBeInTheDocument(); // Ensuring spinner is shown first

  const recipeDetails = await screen.findByText(/recipe details/i); // Adjust based on actual content
  expect(recipeDetails).toBeInTheDocument();
});
