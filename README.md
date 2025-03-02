# Recipes App UI  

## Overview  
The **Recipes App** is a frontend application built using React that allows users to browse, search, and view recipes. It interacts with the **Recipes API** to fetch and display recipe data dynamically.  

## Features  
- Load and display recipes from an external API.  
- Search for recipes based on name and cuisine.  
- View detailed recipe information, including ingredients, instructions, and ratings.  
- Responsive UI for a seamless user experience.  

## Tech Stack  
- **React** (Frontend framework)  
- **React Router** (Client-side navigation)  
- **Fetch API** (API calls)  
- **Styled Components / CSS Modules** (Styling)  
- **Jest & React Testing Library** (Testing)  

## Installation & Setup  
2. **Install dependencies:**  
   ```bash
   npm install
   ```  
3. **Start the development server:**  
   ```bash
   npm start
   ```  
4. Open the app in the browser:  
   ```
   http://localhost:3000
   ```

## API Integration  
The frontend communicates with the **Recipes API** running at:  
```
http://localhost:8080/api/recipes
```

### Fetch Recipes By Search Query  
**Endpoint:**  
```
GET /api/recipes?search={name/cuisine}
```
**Implementation:**  
```javascript
const fetchRecipes = async (searchText) => {
    try {
      const url = new URL("http://localhost:8080/api/recipes");
      url.searchParams.append("search", searchText);
      const response = await fetch(url);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };
```

### Fetch Recipes By Id
**Endpoint:**  
```
GET /api/recipes/{id}
```
**Implementation:**  
```javascript
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/recipes/${id}`);

        if (!response.ok) throw new Error("Failed to fetch recipe");

        setRecipe(await response.json());
      } catch (err) {
        console.error("Error fetching recipe details:", err);
        setErrorMessage(err.message);
      }
    };
```
The value of URL comes from Configuration.


## Project Structure  
```
recipes-orchestrator-ui/
│── src/
│   ├── components/       # Reusable UI components
|   |   |-- pages/        # Page components (Home, Recipe Details)
│   |   ├── molecules/    # A combination of atoms that work together.        
│   |   ├── atoms/        # Basic Building Blocks of UI     
|   |   |-- config/       # Configuration classes for UI  
│   ├── App.js            # Main App Component
│   ├── index.js          # Entry point
│── public/               # Static assets
│── package.json          # Dependencies and scripts
│── README.md             # Documentation
```

## Testing  
Run tests using:  
```bash
npm test
```  

Example test for the `Spinner` component:  
```javascript
import { render, screen } from "@testing-library/react";
import Spinner from "./components/Spinner";

test("renders the spinner component", () => {
  render(<Spinner />);
  expect(screen.getByTestId("spinner-box")).toBeInTheDocument();
});
```

## Lighthouse Report  
To analyze performance, install the **Lighthouse** Chrome extension or run:  
```bash
npx lighthouse http://localhost:3000 --view
```

## Deployment  
Build the project:  
  ```bash
  npm run build
  ```


