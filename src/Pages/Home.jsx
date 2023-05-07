import React, { useState } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";

function getStoredCart() {
  return JSON.parse(window.localStorage.getItem("current_cart")) || [];
}

function Home() {
  const [open, setOpen] = useState(false);
  const [cart, updateCart] = useState(getStoredCart());

  const updateCartAndStorage = (crt) => {
    updateCart(crt);
    window.localStorage.setItem("current_cart", JSON.stringify(crt));
  };

  return (
    <main>
      <NavBar {...{ setOpen, cart }} />
      <Cart {...{ open, setOpen, cart, updateCartAndStorage }} />
      <ProductTable {...{ cart, updateCartAndStorage }} />
    </main>
  );
}

export default Home;
