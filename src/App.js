import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import store from './redux/store'; 
import Categories from './components/Categories';

function App() {
  return (
    <div>
      <HeaderComponent />
      <Categories />
      <FooterComponent store={store} />
    </div>
  );
}

export default App;