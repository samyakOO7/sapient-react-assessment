import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { saveAs } from 'file-saver';
import Spinner from "../../atoms/Spinner/Spinner";
import "./RecipeDetails.css";
import API_CONFIG from "../../config/base-config";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/${id}`);

        if (!response.ok) throw new Error("Failed to fetch recipe");

        const data = await response.json();
        setRecipe(data);
        setImageLoaded(false);
      } catch (err) {
        console.error("Error fetching recipe details:", err);
        setErrorMessage(err.message);
      }
    };

    fetchRecipe();
  }, [id]);

  if (errorMessage) return <div className="error-message">{errorMessage}</div>;
  if (!recipe) return <Spinner />;

  const handleImageDownload = () => {
    saveAs(recipe.image, `${recipe.name}.jpg`);
  };


  return (
    <div className="recipe-details">
      <div className="recipe-box">
        <div className="recipe-grid">
          <div className="recipe-image">
            {!imageLoaded && <Spinner />}
            <img
              src={recipe.image}
              alt={recipe.name}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              style={{ visibility: imageLoaded ? "visible" : "hidden" }}
            />
            <button
              className="download-btn"
              onClick={handleImageDownload}
              type="button"
              aria-label="Download Recipe Image"
            >
              <i className="fa fa-download"/> 
            </button>
          </div>

          <div className="recipe-details-info">
            <h2>{recipe.name}</h2>

            <div className="recipe-info">
              <h3>Details</h3>
              <ul className="hoverable-list">
                <li><strong>Cuisine:</strong> {recipe.cuisine}</li>
                <li><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</li>
                <li><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</li>
                <li><strong>Servings:</strong> {recipe.servings}</li>
                <li><strong>Difficulty:</strong> {recipe.difficulty}</li>
                <li><strong>Calories per Serving:</strong> {recipe.caloriesPerServing}</li>
                <li><strong>Rating:</strong> {recipe.rating} ⭐ ({recipe.reviewCount} reviews)</li>
              </ul>
            </div>
          </div>

          <div className="recipe-ingredients">
            <h3>Ingredients</h3>
            <ul className="hoverable-list">
              {recipe.ingredients?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-steps">
            <h3>Steps</h3>
            <ul className="hoverable-list">
              {recipe.instructions?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
