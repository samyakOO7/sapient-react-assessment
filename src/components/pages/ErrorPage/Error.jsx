import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";
import API_CONFIG from "../../config/base-config";

const Error = () => {
    const navigate = useNavigate();

    return (
        <main className="error-container">
            <header>
                <h1 className="error-title">{API_CONFIG.ERROR_404}</h1>
            </header>
            <section>
                <p className="error-text">{API_CONFIG.PAGE_NOT_FOUND}</p>
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
