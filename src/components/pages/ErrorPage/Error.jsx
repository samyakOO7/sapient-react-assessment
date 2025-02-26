import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="error-container">
            <h1 className="error-title">404</h1>
            <p className="error-text">Page not found</p>
            <button type="button" className="error-button" onClick={() => navigate("/")}>
                Go Home
            </button>
        </div>
    );
};

export default Error;
