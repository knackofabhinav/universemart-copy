import "./ProductCard.css";
import { instance } from "../../App";
import { useTheme } from "../../contexts/theme-context";
import { useDataContext } from "../../contexts/dataContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { Toast } from "../Toast/Toast";

export const ProductCard = ({ item }) => {
  const {
    theme: { dark, light },
    isDark,
  } = useTheme();
  const {
    state: { cart, wishlist, userId },
    dispatch,
  } = useDataContext();
  const { isUserLogin } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");

  const addToWishlist = async (item) => {
    if (isUserLogin) {
      try {
        setToastText("Adding to wishlist...");
        setShowToast(true);
        const res = await instance.post("/wishlist", {
          userId,
          productId: item._id,
        });
        if (res.data.success === false) {
          setToastText("Product Already Exist");
          setShowToast(true);
        }
        if (res.data.success === true) {
          dispatch({ type: "ADD_TO_WISHLIST", payload: res.data.wishlist });
          setToastText("Added to wishlist");
          setShowToast(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowToast(true);
      setToastText("Please Login");
    }
  };

  const addToCart = async (item) => {
    if (isUserLogin) {
      try {
        setToastText("Adding to cart...");
        setShowToast(true);
        const res = await instance.post("/cart", {
          userId: userId,
          productId: item._id,
          quantity: 1,
        });
        setToastText(`added to cart`);
        dispatch({ type: "ADD_TO_CART", payload: res.data.cart });
      } catch (error) {
        setShowToast(true);
        setToastText("Failed To add...");
        console.log(error);
      }
    } else {
      setToastText("Please Login");
      setShowToast(true);
    }
  };
  return (
    <Link to={`/products/${item._id}`} className="link-productcard">
      <div key={item._id} className="card" style={isDark ? dark : light}>
        <div className="thumbnail">
          <img className="image" src={item.image} alt="product" />
          <button
            className="close"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToWishlist(item);
            }}
          >
            {wishlist.find((product) => product._id === item._id) ? (
              <i className="fas fa-heart"></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
          </button>
        </div>
        <h4 className="name">{item.name}</h4>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {item.fastDelivery && (
              <i className="fas fa-shipping-fast out-of-stock"></i>
            )}
            <p className="price">₹ {item.price}/-</p>
          </div>
          {cart.find((cartItem) => cartItem.product._id === item._id) ? (
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
              className={item.inStock ? "btn primary" : "btn disabled"}
              style={{ width: "100%" }}
              disabled={!item.inStock}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(item);
              }}
            >
              {item.inStock ? "Add to Cart" : "Out Of Stock"}
            </button>
          )}
        </div>
        {showToast && (
          <Toast
            showToast={showToast}
            setShowToast={setShowToast}
            text={toastText}
          />
        )}
      </div>
    </Link>
  );
};
