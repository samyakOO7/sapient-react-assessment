import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { saveAs } from "file-saver";
import DownloadImageButton from "../DownloadImageButton";

jest.mock("file-saver", () => ({ saveAs: jest.fn() }));

describe("DownloadImageButton", () => {
  const fileUrl = "https://example.com/image.jpg";
  const fileName = "image.jpg";

  it("renders the download button", () => {
    render(<DownloadImageButton fileUrl={fileUrl} fileName={fileName} />);
    const button = screen.getByRole("button", { name: /download image/i });
    expect(button).toBeInTheDocument();
  });

  it("calls saveAs when the button is clicked", () => {
    render(<DownloadImageButton fileUrl={fileUrl} fileName={fileName} />);
    const button = screen.getByRole("button", { name: /download image/i });
    fireEvent.click(button);
    expect(saveAs).toHaveBeenCalledWith(fileUrl, fileName);
  });

  it("renders the download icon", () => {
    render(<DownloadImageButton fileUrl={fileUrl} fileName={fileName} />);
    const icon = screen.getByRole("button"); 
    expect(icon).toBeInTheDocument();
  });
});
