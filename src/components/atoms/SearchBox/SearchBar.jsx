import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import RecipeCard from "../../molecules/RecipeCard/RecipeCard";
import API_CONFIG from "../../config/base-config";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const fetchRecipes = async (searchText) => {
    try {
      const url = new URL(API_CONFIG.BASE_URL);
      url.searchParams.append("search", searchText);
      const response = await fetch(url);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.length >= 3) fetchRecipes(query);
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [query]);

  const handleSelectRecipe = (id) => {
    navigate(`/recipe/${id}`);
    setQuery("");
    setResults([]);
  };

  return (
    <section className="search-container">
      <label htmlFor="recipe-search" className="recipe-search-label">SEARCH RECIPES</label>
      <input
        id="recipe-search"
        className="search-input"
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    
      {results.length > 0 && (
        <ul className="dropdown">
          {results.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard recipe={recipe} onClick={() => handleSelectRecipe(recipe.id)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SearchBar;
