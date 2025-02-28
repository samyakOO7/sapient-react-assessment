import React from "react";
import PropTypes from "prop-types";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, onClick }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick?.();
    }
  };

  return (
    <article className="recipe-card">
      <button type="button"
        className="recipe-card-button"
        onClick={() => onClick?.()}
        onKeyDown={handleKeyPress}
        aria-label={`View details for ${recipe.name}`}
      >
        <h3 className="recipe-title">{recipe.name}</h3>
        <p className="recipe-cuisine">{recipe.cuisine}</p>
      </button>
    </article>
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
