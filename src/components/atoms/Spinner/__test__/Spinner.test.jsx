import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner from "../Spinner";

describe("Spinner Component", () => {
  test("renders the spinner component", () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId("spinner-box");
    expect(spinnerElement).toBeInTheDocument();
  });

  test("contains an SVG element for animation", () => {
    render(<Spinner />);
    const svgElement = screen.getByTestId("spinner-box").querySelector("svg");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("width", "40");
    expect(svgElement).toHaveAttribute("height", "40");
  });
});
