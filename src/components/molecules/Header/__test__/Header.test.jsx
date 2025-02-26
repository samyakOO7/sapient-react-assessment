import { render, screen } from "@testing-library/react";
import Header from "../Header";

// Test suite for Header component
describe("Header Component", () => {
  test("renders the header with provided title", () => {
    render(<Header title="Test Header" />);
    const headerElement = screen.getByText(/Test Header/i);
    expect(headerElement).toBeInTheDocument();
  });

  test("applies the correct CSS class", () => {
    render(<Header title="Styled Header" />);
    const headerElement = screen.getByText(/Styled Header/i);
    expect(headerElement).toHaveClass("header-text");
  });

  test("renders an empty component when title is not provided", () => {
    render(<Header title="" />);
    const headerElement = screen.getByText("");
    expect(headerElement).toBeInTheDocument();
  });
});