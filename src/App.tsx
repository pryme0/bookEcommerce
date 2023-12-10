import React from "react";
import "./App.css";
import { Login, Register, Home, Orders, Cart } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./components/store";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </CartProvider>
  );
}

export default App;
