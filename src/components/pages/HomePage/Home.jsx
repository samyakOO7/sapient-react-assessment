import React, { Suspense } from "react";
import "./Home.style.css";
import Spinner from "../../atoms/Spinner/Spinner";

const SearchBar = React.lazy(() => import("../../atoms/SearchBox/SearchBar"));

const Home = () => (
  <div className="home-content">
    <p className="welcome-text">Discover and explore delicious recipes effortlessly!</p>
    <div className="spacer" />

    <Suspense fallback={<div><Spinner/></div>}>
      <SearchBar />
    </Suspense>

    <div className="spacer-bottom" />
  </div>
);

export default Home;
