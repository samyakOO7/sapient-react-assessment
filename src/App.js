import React, { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Error from "./components/pages/ErrorPage/Error";
import Spinner from "./components/atoms/Spinner/Spinner";
import Home from "./components/pages/HomePage/Home";
import AppLayout from "./components/pages/AppLayout/AppLayout";


const RecipeDetails = lazy(() => import("./components/pages/RecipeDetailsPage/RecipeDetails"));

const App = () => (
      <Router>
        <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/recipe/:id"
            element={
              <Suspense fallback={<Spinner />}>
                <RecipeDetails />
              </Suspense>
            }
          />
          <Route path="*" element={<Error />} />
        </Route>
        </Routes>
      </Router>
);

export default App;
