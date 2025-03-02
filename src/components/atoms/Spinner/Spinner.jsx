import * as React from "react";

const Spinner = () => {
  const spinnerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  return(
  <section data-testid="spinner-box" style={spinnerContainerStyle}>
    <svg
      width="40"
      height="40"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      stroke="red"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </section>
  );
};

export default Spinner;
