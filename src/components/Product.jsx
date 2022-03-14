import React from "react";
const Product = (props) => {
  const { data, cartCount, incrementCount, decrementCount } = props;
  return (
    <div className="product">
      <div className="box-img">
        <img src={data.img} alt="" />
      </div>
      <div className="product-details">
        <div style={{ fontWeight: "450", color: "darkmagenta" }}>
          {data.title}
        </div>
        <div style={{ fontWeight: "700" }}>
          <strike style={{ color: "grey", fontSize: "0.9rem" }}>
            <span>
              {data.original_price ? `$${data.original_price}.00` : null}
            </span>
          </strike>
          &nbsp;&nbsp;
          <span>${data.price}.00</span>
        </div>
      </div>
      <div className="product-detail">{data.details}</div>
      {cartCount > 0 ? (
        <div className="cart-counter">
          <div className="decrease-cart" onClick={decrementCount}>
            -
          </div>
          <div className="cart-count">{cartCount}</div>
          <div className="increase-cart" onClick={incrementCount}>
            +
          </div>
        </div>
      ) : (
        <div className="product-btn">
          <button onClick={incrementCount}>Add to cart</button>
        </div>
      )}
    </div>
  );
};

export default Product;
