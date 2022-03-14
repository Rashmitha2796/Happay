import React, { useState } from "react";
import "./Products.css";
import Product from "./Product.jsx";
import { Data } from "./Data";
import Navbar from "./Navbar";
const Products = () => {
  const cartValue = localStorage.getItem("cartData")
    ? JSON.parse(localStorage.getItem("cartData"))
    : Data;

  const [cartData, setCartData] = useState(cartValue);

  const AddToCart = (id) => {
    const updatedData = cartData.map((el) => {
      if (el._id === id) {
        return { ...el, count: el.count + 1 };
      } else return el;
    });
    setCartData(updatedData);
    localStorage.setItem("cartData", JSON.stringify(updatedData));
  };

  const removeFromCart = (id) => {
    const updatedData = cartData.map((el) => {
      if (el._id === id) {
        return { ...el, count: el.count - 1 };
      } else return el;
    });
    setCartData(updatedData);
    localStorage.setItem("cartData", JSON.stringify(updatedData));
  };

  const returnCartValue = () => {
    return cartData.length > 0
      ? cartData.map((item) => item.count).reduce((a, b) => a + b)
      : 0;
  };

  return (
    <div className="products">
      <Navbar
        cartValue={returnCartValue()}
        onCartClick={() =>
          localStorage.setItem("cartData", JSON.stringify(cartData))
        }
      />
      <div className="inside-container">
        <div className="most-popular-products">
          <div className="most-popular-hd">Most Popular</div>
          <div className="star-icon">
            <div className="star-wrapper">
              <i className="far fa-star"></i>
            </div>
          </div>
        </div>
        <div className="products-center">
          {cartData.map((product, index) => (
            <Product
              key={product._id}
              data={product}
              incrementCount={() => AddToCart(product._id)}
              pid={index}
              cartCount={product.count}
              decrementCount={() => removeFromCart(product._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
