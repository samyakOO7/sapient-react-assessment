import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../atoms/Spinner/Spinner";
import ImageWithLoader from "../../molecules/ImageWithLoader/ImageWithLoader";
import RecipeInfoList from "../../molecules/RecipeInfoList/RecipeInfoList";
import API_CONFIG from "../../config/base-config";
import "./RecipeDetails.css";
import ImageDownloader from "../../molecules/ImageDownloader/ImageDownloader";

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
    <section className="recipe-details">
      <article className="recipe-box">
        <div className="recipe-grid">
          <figure className="recipe-image">
            <ImageWithLoader src={recipe.image} alt={recipe.name} />
            <ImageDownloader fileUrl={recipe.image} fileName={`${recipe.name}.jpg`} />
          </figure>

          <header className="recipe-details-info">
            <h2>{recipe.name}</h2>
            <RecipeInfoList
              heading="Details"
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
          </header>

          <section className="recipe-ingredients">
            <RecipeInfoList heading="Ingredients" data={recipe.ingredients || []} isLabeled={false} />
          </section>

          <section className="recipe-steps">
            <RecipeInfoList heading="Steps" data={recipe.instructions || []} isLabeled={false} />
          </section>
        </div>
      </article>
    </section>
  );
};

export default RecipeDetails;
