// Home.tsx
import React from "react";
import { Typography, Box, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Welcome to MyChatApp
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Connect and communicate with your world.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
