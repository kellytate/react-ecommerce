import React, { useState, useEffect } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";

function Home() {
  const [open, setOpen] = useState(false);
  const [cart, updateCart] = useState([]);

  useEffect(() => {
    const data = window.localStorage.getItem('CURRENT_CART_STATE');
    if ( data !== null ) updateCart(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('CURRENT_CART_STATE', JSON.stringify(cart));
  }, [cart]);

  return (
    <main>
      <NavBar {...{ setOpen, cart }} />
      <Cart {...{ open, setOpen, cart, updateCart }} />
      <ProductTable {...{ cart, updateCart }} />
    </main>
  );
}

export default Home;
