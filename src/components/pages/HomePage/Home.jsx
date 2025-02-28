import React, { Suspense } from "react";
import "./Home.style.css";
import Spinner from "../../atoms/Spinner/Spinner";

const SearchBar = React.lazy(() => import("../../atoms/SearchBox/SearchBar"));

const Home = () => (
  <main className="home-content">
    <section>
      <p className="welcome-text">Discover and explore delicious recipes effortlessly!</p>
    </section>

    <div className="spacer" />

    <section>
      <Suspense fallback={<div><Spinner/></div>}>
        <SearchBar />
      </Suspense>
    </section>

    <div className="spacer-bottom" />
  </main>
);

export default Home;
