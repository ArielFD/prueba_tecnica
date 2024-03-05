import { Box, Container, Typography } from "@mui/material";
import React from "react";
import WarningIcon from "@mui/icons-material/Warning";

const ErrorPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <WarningIcon sx={{ fontSize: 90, color: "primary.light" }} />
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            fontFamily: "bold",
            color: "primary.light",
          }}
        >
          404
        </Typography>
      </Box>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          fontFamily: "bold",
          color: "grey",
        }}
      >
        Oops... Page Not Found
      </Typography>
    </Container>
  );
};

export default ErrorPage;
