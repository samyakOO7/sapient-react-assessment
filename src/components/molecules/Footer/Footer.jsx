import {
    Box,
    Divider,
    Grid, 
    Link,
    Typography
} from "@mui/material";
import React from "react";
import FOOTER_CONFIG from "../../config/footer-config";
import "./Footer.style.css";

const Footer = () => (
        <footer className="footer">
            <Grid
                className="footer-main"
                width="95%"
                margin="0 auto"f
                display="flex"
                flexDirection="column"
                gap="0.125rem"
                justifyContent="space-between"
                fontSize="2rem"
            >
                <Box component="nav" className="footer-top">
                    <Box
                        width="100vw"
                        display="flex"
                        justifyContent="flex-start"
                        gap="1rem"
                        className="footer-top-left"
                    >
                        {FOOTER_CONFIG.footerTopLeftLinks.map((link) => (
                            <Link
                                key={link.key}
                                href={link.href}
                                className="footer-link"
                                target="_blank"
                                rel="noopener"
                            >
                                {link.text}
                            </Link>
                        ))}
                    </Box>
                </Box>
                <Divider className="divider" />
                <Box className="footer-bottom">
                    <Box>
                        <Typography variant="body2" className="links">
                            <Link
                                fontFamily="Futura"
                                marginRight="0.5rem"
                                href="https://www.publicissapient.com/privacy"
                                className="footer-link"
                            >
                                &copy; {new Date().getFullYear()} Publicis
                                Sapient. All rights reserved.
                            </Link>
                        </Typography>
                    </Box>
                    <Box className="footer-bottom-terms">
                        {FOOTER_CONFIG.footerBottomRightLinks.map((link) => (
                            <Typography
                                key={link.key}
                                fontFamily="Futura"
                                variant="body2"
                                className="footer-link lower-links"
                            >
                                {link.text}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Grid>
        </footer>
    );

export default Footer;
