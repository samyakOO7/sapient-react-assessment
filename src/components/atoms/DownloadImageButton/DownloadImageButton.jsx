import React from "react";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";

const DownloadImageButton = ({ fileUrl, fileName }) => {
  const handleDownload = () => saveAs(fileUrl, fileName);

  return (
    <button className="download-btn" onClick={handleDownload} type="button" aria-label="Download Image">
      <i className="fa fa-download" />
    </button>
  );
};
DownloadImageButton.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired
};

export default DownloadImageButton;
