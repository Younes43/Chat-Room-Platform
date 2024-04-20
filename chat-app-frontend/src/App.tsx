import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Chip,
  Avatar,
  CircularProgress,
} from "@mui/material";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ChatRoom from "./components/ChatRoom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppBarComponent />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

const AppBarComponent = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            MyChatApp
          </Link>
        </Typography>
        {user ? (
          <>
            <Chip
              avatar={<Avatar>{user.username[0]}</Avatar>}
              label={`Logged in as: ${user.username}`}
              color="secondary"
              variant="outlined"
              sx={{ marginRight: 2, color: "white", bgcolor: "primary.dark" }}
            />
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <CircularProgress
        style={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/chat" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/chat" /> : <Signup />}
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatRoom />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
