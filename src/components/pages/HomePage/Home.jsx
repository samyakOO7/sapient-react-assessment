import React, { Suspense } from "react";
import "./Home.style.css";
import Spinner from "../../atoms/Spinner/Spinner";
import API_CONFIG from "../../config/base-config";

const SearchBar = React.lazy(() => import("../../atoms/SearchBox/SearchBar"));

const Home = () => (
  <main className="home-content">
    <section>
      <p className="welcome-text">{API_CONFIG.WELCOME_TEXT}</p>
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
