import { useDataContext } from "../../contexts/dataContext";
import "./Cart.css";
import { useTheme } from "../../contexts/theme-context";
import { instance } from "../../App";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Toast } from "../../components/Toast/Toast";

export const Cart = () => {
  const {
    state: { cart, userId },
    dispatch,
  } = useDataContext();

  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");

  async function increaseCartQuantity(item) {
    try {
      setToastText("Updating Quantity...");
      setShowToast(true);
      const newQuantity = item.quantity + 1;
      const dataFromServer = await instance.post("/cart", {
        userId: userId,
        productId: item.product._id,
        quantity: newQuantity,
      });
      dispatch({
        type: "UPDATE_CART_QUANTITY",
        payload: dataFromServer.data.cart,
      });
    } catch (error) {
      setToastText("Failed to update...");
      setShowToast(true);
      console.log(error);
    }
  }

  async function decreaseCartQuantity(item) {
    try {
      setToastText("Updating Quantity...");
      setShowToast(true);
      const newQuantity = item.quantity - 1;
      const dataFromServer = await instance.post("/cart", {
        userId: userId,
        productId: item.product._id,
        quantity: newQuantity,
      });
      dispatch({
        type: "UPDATE_CART_QUANTITY",
        payload: dataFromServer.data.cart,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromCart(item) {
    try {
      setToastText("Removing Item...");
      setShowToast(true);
      const res = await instance.delete(`/cart/${userId}/${item._id}`);
      dispatch({
        type: "UPDATE_CART_QUANTITY",
        payload: res.data.cart,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const {
    theme: { dark, light },
    isDark,
  } = useTheme();
  return (
    <div style={isDark ? dark : light} className="cart-container">
      {cart.length !== 0 ? (
        <h1 className="total-amount">
          Total Price: ₹{" "}
          {cart.length > 0 &&
            cart
              .map((item) => item.quantity * item.product.price)
              .reduce((acc, val) => acc + val)}
          /-
        </h1>
      ) : (
        <h1
          style={
            isDark
              ? {
                  ...dark,
                  display: "flex",
                  justifyContent: "center",
                  alignText: "center",
                }
              : {
                  ...light,
                  display: "flex",
                  justifyContent: "center",
                  alignText: "center",
                }
          }
        >
          Cart is Empty
        </h1>
      )}
      <ul className="cart-list">
        {cart.map((item) => {
          return (
            <Link
              to={`/products/${item.product._id}`}
              className="link-cartcard"
            >
              <li key={item.product._id}>
                <div
                  className="cart-item text horizontal"
                  style={
                    isDark ? { ...dark, backgroundColor: "#121212" } : light
                  }
                  onClick={() =>
                    dispatch({
                      type: "LOAD_THIS_ITEM_ON_PRODUCT_PAGE",
                      payload: item,
                    })
                  }
                >
                  <img
                    className="product-image"
                    src={item.product.image}
                    alt="product"
                  />
                  <div>
                    <h2>{item.product.name}</h2>
                    <h3>₹ {item.product.price}/-</h3>
                  </div>

                  <div className="links">
                    <p>Quantity:</p>
                    <p>
                      <button
                        className="btn primary"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          increaseCartQuantity(item);
                        }}
                      >
                        +
                      </button>
                      {item.quantity}
                      <button
                        className="btn primary"
                        disabled={item.quantity === 1 ? true : false}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          decreaseCartQuantity(item);
                        }}
                      >
                        -
                      </button>
                    </p>
                    <button
                      className="btn secondary text"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeFromCart(item);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
      <button className="btn primary">Checkout</button>
      <Link
        to="/products"
        style={{ textDecoration: "none", marginBottom: "10rem" }}
        className="btn secondary text"
      >
        View More Products
      </Link>
      {showToast && (
        <Toast
          showToast={showToast}
          setShowToast={setShowToast}
          text={toastText}
        />
      )}
    </div>
  );
};
