import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const Spinner = () => (
        <SpinnerContainer data-testid="spinner-box">
          <CircularProgress sx={{ color: "red" }} />
        </SpinnerContainer>
);

const SpinnerContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
});

export default Spinner;
