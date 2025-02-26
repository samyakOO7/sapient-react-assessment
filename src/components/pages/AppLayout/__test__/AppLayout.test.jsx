import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import Header from "../../molecules/Header/Header";
import Footer from "../../molecules/Footer/Footer";

jest.mock("../../molecules/Header/Header", () => jest.fn(() => <div data-testid="header">Header</div>));
jest.mock("../../molecules/Footer/Footer", () => jest.fn(() => <div data-testid="footer">Footer</div>));

describe("AppLayout Component", () => {
  test("renders Header, Footer, and Outlet", () => {
    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("displays correct title in Header", () => {
    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
