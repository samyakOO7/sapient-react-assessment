import React from "react";
import { render, screen } from "@testing-library/react";
import AppLayout from "../AppLayout";

describe("AppLayout Component", () => {
  test("renders Header, Footer, and Outlet",async () => {
    render(
        <AppLayout />
    );

    expect(await screen.findByText(/Recipe Orchestrator/)).toBeInTheDocument();
    expect(await screen.findByText(/Publicis Sapient/)).toBeInTheDocument();
  });
});
