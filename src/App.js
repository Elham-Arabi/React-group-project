import React from "react";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import Categories from "./components/Categories";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <Router>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/ProductDetails/:id" element={<ProductDetails />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
