import React from "react";
import PropTypes from "prop-types";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, onClick }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick?.();
    }
  };

  return (
    <div
      className="recipe-card"
      onClick={() => onClick?.()}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${recipe.name}`}
    >
      <h3 className="recipe-title">{recipe.name}</h3>
      <p className="recipe-cuisine">{recipe.cuisine}</p>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cuisine: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func
};

RecipeCard.defaultProps = {
  onClick: () => {}
};

export default React.memo(RecipeCard);
