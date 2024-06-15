import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { Loading } from "../components";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProductsPage from "../pages/ProductsPage";
import ErrorPage from "../pages/ErrorPage";
import SingleProductPage from "../pages/SingleProductPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

const ConfigRoutes = () => {
  return (
    <React.Suspense fallback={<Loading lazy />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </React.Suspense>
  );
};

export default ConfigRoutes;
