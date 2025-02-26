import { render, screen } from "@testing-library/react";
import Footer from "../Footer";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  test("renders footer links correctly", () => {
    render(<Footer />);
    
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Discover")).toBeInTheDocument();
    expect(screen.getByText("Explore")).toBeInTheDocument();
    
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    
    expect(
      screen.getByText(/© \d{4} Publicis Sapient. All rights reserved./)
    ).toBeInTheDocument();
  });

  test("ensures links have correct href attributes", () => {
    render(<Footer />);

    expect(screen.getByText("About").closest("a")).toHaveAttribute(
      "href",
      "https://www.publicissapient.com/about"
    );
    expect(screen.getByText("Discover").closest("a")).toHaveAttribute(
      "href",
      "https://www.publicissapient.com/services/"
    );
    expect(screen.getByText("Explore").closest("a")).toHaveAttribute(
      "href",
      "https://www.publicissapient.com/industries/"
    );
  });
});
