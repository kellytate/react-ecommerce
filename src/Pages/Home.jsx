import React, { useState, useEffect } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";

function Home() {
  const [open, setOpen] = useState(false);
  const [cart, updateCart] = useState(JSON.parse(localStorage.getItem('CURRENT_CART_STATE')) || []);

  useEffect(() => {
    localStorage.setItem('CURRENT_CART_STATE', JSON.stringify(cart));
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
