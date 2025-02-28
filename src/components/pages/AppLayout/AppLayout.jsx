import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import CONFIG from "../../config/base-config";
import "./AppLayout.css";
import Spinner from "../../atoms/Spinner/Spinner";

const Header = React.lazy(() => import("../../molecules/Header/Header"));
const Footer = React.lazy(() => import("../../molecules/Footer/Footer"));

const AppLayout = () => (
    <div className="layout-wrapper">
        <header>
            <Suspense fallback={<div><Spinner/></div>}>
                <Header title={CONFIG.APP_TITLE} />
            </Suspense>
        </header>
        
        <main className="main-content">
            <Outlet />
        </main>
        
        <footer>
            <Suspense fallback={<div><Spinner/></div>}>
                <Footer />
            </Suspense>
        </footer>
    </div>
);

export default AppLayout;
