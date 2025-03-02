import React from "react";
import FOOTER_CONFIG from "../../config/footer-config";
import "./Footer.style.css";

const Footer = () => (
    <footer className="footer">
        <div className="footer-main">
            <nav className="footer-top">
                <div className="footer-top-left">
                    {FOOTER_CONFIG.footerTopLeftLinks.map((link) => (
                        <a
                            key={link.key}
                            href={link.href}
                            className="footer-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {link.text}
                        </a>
                    ))}
                </div>
            </nav>
            <hr className="divider" />
            <div className="footer-bottom">
                <div>
                    <p className="links">
                        <a
                            href="https://www.publicissapient.com/privacy"
                            className="footer-link"
                        >
                            &copy; {new Date().getFullYear()} Publicis Sapient. All rights reserved.
                        </a>
                    </p>
                </div>
                <div className="footer-bottom-terms">
                    {FOOTER_CONFIG.footerBottomRightLinks.map((link) => (
                        <p key={link.key} className="footer-link lower-links">
                            {link.text}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
