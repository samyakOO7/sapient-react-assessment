import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../atoms/Spinner/Spinner";
import ImageWithLoader from "../../molecules/ImageWithLoader/ImageWithLoader";
import DownloadButton from "../../atoms/DownloadImageButton/DownloadImageButton";
import RecipeInfoList from "../../molecules/RecipeInfoList/RecipeInfoList";
import API_CONFIG from "../../config/base-config";
import "./RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/${id}`);

        if (!response.ok) throw new Error("Failed to fetch recipe");

        setRecipe(await response.json());
      } catch (err) {
        console.error("Error fetching recipe details:", err);
        setErrorMessage(err.message);
      }
    };

    fetchRecipe();
  }, [id]);

  if (errorMessage) return <div className="error-message">{errorMessage}</div>;
  if (!recipe) return <Spinner />;

  return (
    <div className="recipe-details">
      <div className="recipe-box">
        <div className="recipe-grid">
          <div className="recipe-image">
            <ImageWithLoader src={recipe.image} alt={recipe.name} />
            <DownloadButton fileUrl={recipe.image} fileName={`${recipe.name}.jpg`} />
          </div>

          <div className="recipe-details-info">
            <h2>{recipe.name}</h2>
            <RecipeInfoList
            title="Details"
              data={[
                { label: "Cuisine", value: recipe.cuisine },
                { label: "Prep Time", value: `${recipe.prepTimeMinutes} minutes` },
                { label: "Cook Time", value: `${recipe.cookTimeMinutes} minutes` },
                { label: "Servings", value: recipe.servings },
                { label: "Difficulty", value: recipe.difficulty },
                { label: "Calories per Serving", value: recipe.caloriesPerServing },
                { label: "Rating", value: `${recipe.rating} ⭐ (${recipe.reviewCount} reviews)` }
              ]}
              isLabeled
            />
          </div>

          <div className="recipe-ingredients">
          <RecipeInfoList title="Ingredients" data={recipe.ingredients || []}  isLabeled={false}/>
          </div>

          <div className="recipe-steps">
          <RecipeInfoList title="Steps" data={recipe.instructions || []}  isLabeled={false}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
