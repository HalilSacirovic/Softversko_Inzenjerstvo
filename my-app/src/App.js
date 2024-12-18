import React, { useState, useEffect } from "react";
import AddProduct from "./pages/AddProduct/AddProduct";
import AddUser from "./pages/ForTesting";
import UserList from "./pages/ListUser";
import SignUp from "./pages/SignUp/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/Home";
import Product from "./pages/ProductPage/Product";
import User from "./pages/User/User";
import Login from "./pages/Login/Login";
import AdminPage from "./pages/AdminPage/AdminPage";
import UserTable from "./pages/AdminPage/ListUsers";
import ProductList from "./pages/AdminPage/ProductList";

const App = () => {
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/product")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Dohvaćeni podaci:", data);
  //       setItems(data);
  //     })
  //     .catch((error) => {
  //       console.error("Došlo je do greške:", error);
  //     });
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/signup/:id" element={<SignUp />} /> ovde sam stavio jer saljem id od usera ali treba za produkt k */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<UserTable />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
