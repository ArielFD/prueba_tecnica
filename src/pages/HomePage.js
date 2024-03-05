import { Container, Typography } from "@mui/material";
import React from "react";

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" sx={{ textAlign: "center", fontFamily: "bold" }}>
        Bienvenido
      </Typography>
    </Container>
  );
};

export default HomePage;
