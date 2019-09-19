import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Contexts
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));

  useEffect(() => {
    // Initializes an empty cart if no 'cart' is found in local storage
    if (!cart) {
      localStorage.setItem('cart', JSON.stringify([]));
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
  }, [cart]);

  const addItem = item => {
    // Get current cart from localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart'));
    const newCart = [...currentCart, item];
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(JSON.parse(localStorage.getItem('cart')));
  };

  const removeItem = id => {
    const currentCart = JSON.parse(localStorage.getItem('cart'));
    // console.log('current cart: ', currentCart);
    const newCart = currentCart.filter((item, index) => index !== id);
    // console.log('updated cart: ', newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    // console.log(localStorage.getItem('cart'));
    setCart(JSON.parse(localStorage.getItem('cart')));
  };

  // Used as a placeholder until cart creation
  if (!cart) {
    return <div>Loading cart...</div>;
  }

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeItem }}>
        <div className='App'>
          <Navigation />

          {/* Routes */}
          <Route exact path='/' component={Products} />

          <Route path='/cart' component={ShoppingCart} />
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
