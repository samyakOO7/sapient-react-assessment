import React from "react";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import "./ImageDownloader.css";

const ImageDownloader = ({ fileUrl, fileName }) => {
  const handleDownload = () => saveAs(fileUrl, fileName);

  return (
    <button className="download-btn" onClick={handleDownload} type="button" aria-label="Download Image">
      <i className="fa fa-download" />
    </button>
  );
};
ImageDownloader.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired
};

export default ImageDownloader;
