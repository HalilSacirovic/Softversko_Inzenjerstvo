import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import AddProduct from "./pages/AddProduct/AddProduct";
import HomePage from "./pages/HomePage/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);

// React.render(<App/>)
