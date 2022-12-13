import React from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import { useState } from "react";
import CartProvider from "./store/CartProvider";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCart = () => {
    setCartIsShown(true);
  };
  const closeCart = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={closeCart} />}
      <Header onShowCart={showCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
