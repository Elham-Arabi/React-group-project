import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import Categories from "./components/Categories";
import ProductDetails from "./components/ProductDetails";
import CollectionComponent from "./components/CollectionComponent";
import ProductFeatureCard from "./components/ProductFeatureCard";

function App() {
  return (
    <Router>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/ProductFeatureCard/:id" element={<ProductFeatureCard />} />
        <Route path="/" element={<CollectionComponent />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/ProductFeatureCard/:id" element={<ProductFeatureCard />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
