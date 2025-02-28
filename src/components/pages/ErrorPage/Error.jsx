import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";

const Error = () => {
    const navigate = useNavigate();

    return (
        <main className="error-container">
            <header>
                <h1 className="error-title">404</h1>
            </header>
            <section>
                <p className="error-text">Page not found</p>
            </section>
            <nav>
                <button type="button" className="error-button" onClick={() => navigate("/")}>
                    Go Home
                </button>
            </nav>
        </main>
    );
};

export default Error;
