const environments = {
  development: {
    BASE_URL: "http://localhost:8080/api/recipes"
  },
  production: {
    BASE_URL: "http://localhost:8080/api/recipes"
  },
  test: {
    BASE_URL: "http://localhost:5000/api/recipes"
  }
};

const currentEnv = process.env.NODE_ENV || "development";

const API_CONFIG = {
  ...environments[currentEnv] || environments.development, 
  APP_TITLE: "Recipe Orchestrator",
  SEARCH_PATH: "search",
  WELCOME_TEXT: "Discover and explore delicious recipes effortlessly!",
  SEARCH_RECIPES: "Search Recipes",
  PAGE_NOT_FOUND: "Page not found",
  ERROR_404: "404"
};

export default API_CONFIG;
