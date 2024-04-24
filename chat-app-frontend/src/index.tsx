import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

// Function to set up Axios default headers
const setupAxiosHeaders = () => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("axios.defaults.headers.common`Bearer ${token}`;");
  } else {
    console.warn("No token found");
  }
};

// Execute the setup function to ensure headers are configured before the application loads
setupAxiosHeaders();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
