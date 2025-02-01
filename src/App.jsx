import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import View from "./pages/View";
import Manage from "./pages/Manage";
import Settings from "./pages/Settings";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Breadcrumbs,
} from "@mui/material";
import { fontSize, styled } from "@mui/system";
import config from "./config";

const StyledLink = styled(Link)({
  color: "white",
  textDecoration: "none",
  transition: "all 0.1s ease",
  "&:hover": {
    fontSize: "1.1rem",
  },
});

function App() {
  return (
    <div style={{ background: "white" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Student Management
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator="|"
              sx={{
                "& .MuiBreadcrumbs-separator": {
                  color: "white",
                },
              }}
            >
              <StyledLink to="/">Attendance</StyledLink>
              <StyledLink to="/view">View Attendance</StyledLink>
              <StyledLink to="/manage">Manage Students</StyledLink>
              <StyledLink to="/settings">Settings</StyledLink>
            </Breadcrumbs>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes >
          <Route path="/" element={<Home baseURL={config.baseURL} />} />
          <Route path="/view" element={<View baseURL={config.baseURL} />} />
          <Route path="/manage" element={<Manage baseURL={config.baseURL} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
