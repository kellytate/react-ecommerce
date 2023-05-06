import React, { useState, useEffect } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";

function Home() {
  const [open, setOpen] = useState(false);
  const [cart, updateCart] = useState([]);
  useEffect(() => {
    window.localStorage.setItem('CURRENT_CART_STATE', JSON.stringify(cart));
    console.log(cart);
  }, [cart]);

  

  return (
    <main>
      <NavBar {...{ setOpen }} />
      <Cart {...{ open, setOpen, cart, updateCart }} />
      <ProductTable {...{ cart, updateCart }} />
    </main>
  );
}

export default Home;
