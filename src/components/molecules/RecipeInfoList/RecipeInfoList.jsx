import React from "react";
import PropTypes from "prop-types";

const RecipeInfoList = ({ data = [], title, isLabeled }) => (
  <div className="recipe-section">
    <h3>{title}</h3>
    <ul className="hoverable-list">
      {isLabeled
        ? data.map(({ label, value }) => (
            <li key={label}>
              <strong>{label}:</strong> {value}
            </li>
          ))
        : data.map((item) => <li key={item}>{item}</li>)}
    </ul>
  </div>
);

RecipeInfoList.defaultProps = {
    isLabeled: false
  };

RecipeInfoList.propTypes = {
  title: PropTypes.string.isRequired,
  isLabeled: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      }),
      PropTypes.string, 
      PropTypes.number
    ])
  ).isRequired
};

export default RecipeInfoList;
