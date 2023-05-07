import React, { useEffect, useState } from "react";
import ProductFilters from "./ProductFilters";

const getDefaultFilterOptions = () => {
  return {
    price: [
      { minValue: 0, maxValue: 25, label: "$0 - $25", checked: false },
      { minValue: 25, maxValue: 50, label: "$25 - $50", checked: false },
      { minValue: 50, maxValue: 75, label: "$50 - $75", checked: false },
      { minValue: 75, maxValue: Number.MAX_VALUE, label: "$75+", checked: false },
    ],
    color: [
      { value: "beige", label: "Beige", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "white", label: "White", checked: false },
      { value: "black", label: "Black", checked: false },
      { value: "gray", label: "Gray", checked: false },
      { value: "teal", label: "Teal", checked: false },
    ],
  };
};

const getDefaultSortOptions = () => {
  return [
    { name: "Price", current: false },
    { name: "Newest", current: false },
  ];
};



export default function ProductTable({ cart, updateCartAndStorage }) {
  let [products, setProducts] = useState([]);

  const [filterOptions, setFilterOptions] = useState(getDefaultFilterOptions());
  const [sortOptions, setSortOptions] = useState(getDefaultSortOptions());

  useEffect(() => {
    let fetchProducts = async () => {
      console.info("Fetching Products...");
      let res = await fetch("http://localhost:3001/products");
      let body = await res.json();
      setProducts(body);
    };
    fetchProducts();
  }, []);

  const handleSort = (sortOptions) => {
    let sortedProducts;
    console.log(sortOptions)
    sortOptions.map(option => {
      if (option.current && option.name === 'Price') {
        sortedProducts = [...products].sort((a,b) => {
          return a.price > b.price ? 1 : -1;
        })
        setProducts(sortedProducts);
      }
      if (option.current && option.name === 'Newest') {
        sortedProducts = [...products].sort((a,b) => {
          return a.releaseDate > b.releaseDate ? 1 : -1;
        })
        setProducts(sortedProducts);
      }
    })
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <ProductFilters {...{ filterOptions, setFilterOptions, sortOptions, setSortOptions, handleSort }} />

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
            <a key={product.id} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover"
                />
                <button
                  type="button"
                  className="hidden group-hover:block group-hover:opacity-50 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black"
                  onClick={() => {
                    let newCart = cart.slice();

                    // I encountered an error such that after successful loading of
                    // cart from localStorage, newCart.includes(product) was not
                    // recognizing that a product was already in the cart.
                    // So, duplicate id's were being allowed, triggering an error
                    // upon opening the cart display.
                    
                    const itemToAdd = newCart.filter((itemToAdd) => {
                      return itemToAdd.id === product.id;
                    })

                    if (itemToAdd.length === 0) {
                      product.quantity = 1;
                      newCart.push(product);
                    } else {
                      newCart.map((p) => {
                        if (p.id === product.id) {
                          p.quantity += 1;
                        }
                      });
                    }

                    updateCartAndStorage(newCart);
                  }}
                >
                  Add To Cart
                </button>
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
