import React from "react";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import Categories from "./components/Categories";

function App() {
  return (
    <div>
      <HeaderComponent />
      <Categories />
      <FooterComponent />
    </div>
  );
}

export default App;
