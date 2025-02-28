import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageWithLoader from "../ImageWithLoader";

describe("ImageWithLoader Component", () => {
  const src = "test-image.jpg";
  const alt = "Test Image";

  test("displays spinner initially", () => {
    render(<ImageWithLoader src={src} alt={alt} />);
    expect(screen.getByTestId("spinner-box")).toBeInTheDocument();
  });

  test("hides spinner and shows image on load", () => {
    render(<ImageWithLoader src={src} alt={alt} />);
    
    const image = screen.getByAltText(alt);
    expect(image).toHaveStyle("visibility: hidden");

    fireEvent.load(image);
    expect(image).toHaveStyle("visibility: visible");
  });

  test("hides spinner and shows image on error", () => {
    render(<ImageWithLoader src={src} alt={alt} />);
    
    const image = screen.getByAltText(alt);
    fireEvent.error(image);
    expect(image).toHaveStyle("visibility: visible");
  });
});
