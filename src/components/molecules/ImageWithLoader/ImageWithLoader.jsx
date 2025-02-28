import React, { useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../../atoms/Spinner/Spinner";


const ImageWithLoader = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {!imageLoaded && <Spinner />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(true)}
        style={{ visibility: imageLoaded ? "visible" : "hidden" }}
      />
    </>
  );
};

ImageWithLoader.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default ImageWithLoader;
