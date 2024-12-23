import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import store from './redux/store'; 
import Categories from './components/Categories';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
      <HeaderComponent />
      <Routes>
        <Route path='ProductDetails' />
      </Routes>
      <Categories />
      <FooterComponent store={store} />
    </div>
    </Router>
  );
}

export default App;