import { useParams } from "react-router";
import { useDataContext } from "../../contexts/dataContext";
import { useTheme } from "../../contexts/theme-context";
import { instance } from "../../App";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Toast } from "../../components/Toast/Toast";

import "./ProductPage.css";
export const ProductPage = () => {
  const {
    theme: { dark, light },
    isDark,
  } = useTheme();
  const {
    state: { cart, productlist },
    addToCart,
    addToWishlist,
    showToast,
    setShowToast,
    toastText,
  } = useDataContext();
  const { id } = useParams();

  const getProductDetails = (productlist, id) =>
    productlist.find((product) => product._id === id);
  const product = getProductDetails(productlist, id);

  return (
    <div>
      {product && (
        <div className="product-page-container" style={isDark ? dark : light}>
          <div className="product-image-container">
            <img src={product.image} alt="product" />
          </div>
          <h2 className="product-name">{product.name}</h2>
          <h3 className="product-name">
            Price: ₹{product.price}
            /-
          </h3>
          <div className="buttons-container">
            {cart.find((cartItem) => cartItem.id === product.id) ? (
              <Link
                to="/cart"
                className="btn secondary"
                style={{
                  display: "flex",
                  textDecoration: "none",
                  justifyContent: "center",
                }}
              >
                Go To Cart
              </Link>
            ) : (
              <button
                className="btn primary"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
            )}
            <button
              className="btn secondary"
              onClick={() => {
                addToWishlist(product);
              }}
            >
              Add To Wishlist
            </button>
          </div>
          <h2 className="product-name">Product Description</h2>
          <h3 className="product-name">Author:</h3>{" "}
          <p className="product-name">{product.description.author.name}</p>
          <h3 className="product-name">About</h3>
          <p className="product-name">{product.description.author.about}</p>
          <h3 className="product-name">Reviews</h3>
          <ul className="review-list">
            {product.description.review.map((item) => (
              <li key={item} className="review">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showToast && (
        <Toast
          showToast={showToast}
          setShowToast={setShowToast}
          text={toastText}
        />
      )}
      <div
        style={{
          justifyContent: "center",
          textAlign: "center",
          margin: "2rem",
        }}
      >
        <Link
          style={{ textDecoration: "none" }}
          to="/products"
          className="btn primary"
        >
          View More Products
        </Link>
      </div>
    </div>
  );
};
