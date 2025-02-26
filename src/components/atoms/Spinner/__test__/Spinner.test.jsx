import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Spinner from "../Spinner";

describe("Spinner component", () => {
    it("renders without crashing", () => {
        const { getByTestId } = render(<Spinner />);
        const spinnerBox = getByTestId("spinner-box");
        expect(spinnerBox).toBeInTheDocument();
    });

    it("renders CircularProgress component", () => {
        const { getByTestId } = render(<Spinner />);
        const circularProgress = getByTestId("spinner-box");
        expect(circularProgress).toBeInTheDocument();
    });

    it("matches snapshot", () => {
        const { container } = render(<Spinner />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
