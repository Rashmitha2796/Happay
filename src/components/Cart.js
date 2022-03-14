import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cartData")) ?? [];
  const [cartFilter, setCartFilter] = useState(cart);

  const items = cart.find((el) => el?.original_price) ?? {};
  const shippingValue = 5;
  const taxesAndCharges = 2;

  const returnTotalValue = () => {
    return cart.reduce((prev, item) => {
      return prev + item.price * item.count;
    }, 0);
  };

  const AddToCart = (id) => {
    const updatedData = cart.map((el) => {
      if (el._id === id) {
        return { ...el, count: el.count + 1 };
      } else return el;
    });
    setCartFilter(updatedData);
    localStorage.setItem("cartData", JSON.stringify(updatedData));
  };

  const removeFromCart = (id) => {
    const updatedData = cart.map((el) => {
      if (el._id === id) {
        return { ...el, count: el.count - 1 };
      } else return el;
    });
    setCartFilter(updatedData);
    localStorage.setItem("cartData", JSON.stringify(updatedData));
  };

  const deleteFromCart = (id) => {
    const updatedData = cart.filter((item) => item._id !== id);
    setCartFilter(updatedData);
    const updatedCartData = cart.map((el) => {
      if (el._id === id) {
        return { ...el, count: 0 };
      } else return el;
    });
    localStorage.setItem("cartData", JSON.stringify(updatedCartData));
  };

  const filterCartData = cartFilter.filter((el) => el?.count > 0);

  return (
    <div className="cart">
      <div className="inside-container">
        {filterCartData.length === 0 ? (
          <>
            <h3>Cart is Empty</h3>
          </>
        ) : (
          <>
            <div className="link">
              <Link to="/products">
                <i className="fas fa-arrow-left"></i>
                &nbsp;&nbsp;&nbsp;&nbsp;Back to Home
              </Link>
            </div>
            <div className="cart-name">
              Order Summary&nbsp;&nbsp;(&nbsp;&nbsp;{cart.length}
              &nbsp;&nbsp;Items&nbsp;&nbsp;)
            </div>
            <div className="cart-center">
              <div className="cart-info">
                <div className="single-cart list">
                  <div>S. NO.</div>
                  &nbsp;
                  <div>Items</div>
                  &nbsp; &nbsp; &nbsp;
                  <div>QTY</div>
                  &nbsp;
                  <div>DEL</div>
                </div>
                {filterCartData.map((cart, index) => (
                  <div className="list" key={cart._id}>
                    <div>{index + 1}.</div>
                    <div className="cart-title sameItem">
                      <h4>{cart.title}</h4>
                    </div>
                    <div className="Cart-counter">
                      <div
                        className="Decrease-cart"
                        onClick={() => removeFromCart(cart._id)}
                      >
                        -
                      </div>
                      <div className="Cart-count">{cart.count}</div>
                      <div
                        className="Increase-cart"
                        onClick={() => AddToCart(cart._id)}
                      >
                        +
                      </div>
                    </div>
                    <div className="delete-item">
                      <i
                        className="fas fa-trash"
                        onClick={() => deleteFromCart(cart._id)}
                      ></i>
                    </div>
                  </div>
                ))}
                {filterCartData.length < 4 ? (
                  <div className="single-cart add">
                    <Link to="/products">
                      <i className="fas fa-plus"></i>&nbsp;&nbsp;Add more items
                    </Link>
                  </div>
                ) : null}
              </div>
              <div className="cart-results">
                <div>
                  <h3>Price Details</h3>
                </div>
                <div>
                  <div className="horz-line"> </div>
                </div>
                {filterCartData.map((cart, index) => (
                  <div className="details" key={index}>
                    <div>
                      <h4>
                        {cart.count} <i className="fas fa-times"></i> $
                        {cart.price}.00
                      </h4>
                    </div>
                    <div className="price">
                      <h4>${cart.price * cart.count}.00</h4>
                    </div>
                  </div>
                ))}
                <div className="horz-line"> </div>
                {filterCartData.map((cart, index) => (
                  <div key={index}>
                    {cart.title === "Food Card" ? (
                      <div className="details">
                        <div>
                          <h4>Total Savings</h4>
                        </div>
                        <div>
                          <h4 style={{ fontWeight: "200" }}>{`-$${
                            cart.title === "Food Card"
                              ? (items?.original_price - items?.price) *
                                cart.count
                              : null
                          }.00`}</h4>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
                <div className="details">
                  <div>
                    <h4>Delivery Fee</h4>
                  </div>
                  <div>
                    <h4>{`$${shippingValue}.00`}</h4>
                  </div>
                </div>
                <div className="details">
                  <div>
                    <h4>
                      Taxes and Charges&nbsp;&nbsp;
                      <i class="fas fa-exclamation-circle"></i>
                    </h4>
                  </div>
                  <div>
                    <h4>{`$${taxesAndCharges}`}.00</h4>
                  </div>
                </div>
                <div className="details">
                  <div>
                    <h4 style={{ fontWeight: "800" }}>To Pay</h4>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: "800" }}>
                      ${returnTotalValue() + shippingValue + taxesAndCharges}
                    </h4>
                  </div>
                </div>
                <div className="btn">
                  <button>Place Order</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
