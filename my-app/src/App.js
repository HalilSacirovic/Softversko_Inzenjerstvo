import React, { useState, useEffect } from "react";
import AddProduct from "./pages/AddProduct/AddProduct";
import SignUp from "./pages/SignUp/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/Home";
import Product from "./pages/ProductPage/Product";
import Login from "./pages/Login/Login";
import AdminPage from "./pages/AdminPage/AdminPage";
import UserTable from "./pages/AdminPage/ListUsers";
import ProductList from "./pages/AdminPage/ProductList";
import Favorites from "./pages/Favorite/Favorite";
import { Provider, useDispatch } from "react-redux";
import { authSlice } from "./store/authSlice";
import { jwtDecode } from "jwt-decode";
import { store } from "./store/store";
import ProtectedRoute from "./Routes/ProtectedRoute";
import ProfilePage from "./pages/User/User";
import ProfileUser from "./pages/UserProfile/ProfileUser";
import CartPage from "./pages/Cart/Cart";
import ConfirmAccount from "./components/Confirm";

const NavigationRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log("token jwt", token);
      dispatch(authSlice.actions.setData(decoded));
      console.log("decoded", decoded);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/signup/:id" element={<SignUp />} /> ovde sam stavio jer saljem id od usera ali treba za produkt k */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/user_profile/:id" element={<ProfileUser />} />
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/users" element={<UserTable />} />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirm"
          element={
            <ProtectedRoute>
              <ConfirmAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addproduct"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationRoutes />
    </Provider>
  );
};

export default App;
