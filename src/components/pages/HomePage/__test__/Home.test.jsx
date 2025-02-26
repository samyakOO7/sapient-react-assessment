import React, { Suspense } from "react";
import { render, screen } from "@testing-library/react";
import Home from "../Home";

jest.mock("../../../atoms/SearchBox/SearchBar", () => () => <div data-testid="search-bar" />);

describe("Home Component", () => {
  test("renders welcome text", async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    );

    expect(screen.getByText("Discover and explore delicious recipes effortlessly!")).toBeInTheDocument();
  });

  test("renders the SearchBar component", async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    );

    expect(await screen.findByTestId("search-bar")).toBeInTheDocument();
  });
});
