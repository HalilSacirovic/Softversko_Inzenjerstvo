import React, { useState, useEffect } from "react";
import AddProduct from "./pages/AddProduct/AddProduct";
import AddUser from "./pages/ForTesting";
import UserList from "./pages/ListUser";
import SignUp from "./pages/SignUp/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/Home";
import Product from "./pages/ProductPage/Product";

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dohvaćeni podaci:", data);
        setItems(data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/signup/:id" element={<SignUp />} /> ovde sam stavio jer saljem id od usera ali treba za produkt k */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
