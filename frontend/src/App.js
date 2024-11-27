import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state)=>state.user.currentUser);
  return (
    <>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/products/:category" Component={ProductList} />
        <Route path="/product/:id" Component={Product} />
        <Route path="/cart" Component={Cart} />
        <Route path="/login" Component={user ? Home : Login} />
        <Route path="/register" Component={user ? Home : Register} />
      </Routes>
    </>
  );
};

export default App;
