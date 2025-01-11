import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import Categories from "./components/Categories";
import ProductDetails from "./components/ProductDetails";

import ProductFeatureCard from "./components/ProductFeatureCard";
import Shop from "./components/Shop";

function App() {
  return (
    <Router>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route
          path="/ProductFeatureCard/:id"
          element={<ProductFeatureCard />}
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
