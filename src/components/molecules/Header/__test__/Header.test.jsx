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

  test("renders an empty header when title is an empty string", () => {
    render(<Header title="" />);
    
    const headerElement = screen.getByRole("heading", { level: 1 });

    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toBeEmptyDOMElement();
  });
});
