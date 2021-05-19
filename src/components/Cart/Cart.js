import { useDataContext } from "../../contexts/dataContext";
import "./Cart.css";
import { useTheme } from "../../contexts/theme-context";
import { instance } from "../../App";

export const Cart = () => {
  const {
    state: { cart, userId },
    dispatch,
  } = useDataContext();

  async function increaseCartQuantity(item) {
    try {
      const newQuantity = item.quantity + 1;
      const dataFromServer = await instance.post("/cart", {
        userId: userId,
        productId: item.product._id,
        quantity: newQuantity,
      });
      console.log(dataFromServer);
      dispatch({
        type: "UPDATE_CART_QUANTITY",
        payload: dataFromServer.data.cart,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function decreaseCartQuantity(item) {
    try {
      const newQuantity = item.quantity - 1;
      const dataFromServer = await instance.post("/cart", {
        userId: userId,
        productId: item.product._id,
        quantity: newQuantity,
      });
      console.log(dataFromServer);
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
      <h1 className="total-amount">
        Total Price: ₹{" "}
        {cart.length > 0 &&
          cart
            .map((item) => item.quantity * item.product.price)
            .reduce((acc, val) => acc + val)}
        /-
      </h1>
      <ul className="cart-list">
        {cart &&
          cart.map((item) => {
            return (
              <li key={item.product._id}>
                <div
                  className="card text horizontal"
                  style={isDark ? dark : light}
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
                        e.stopPropagation();
                        removeFromCart(item);
                        dispatch({
                          type: "REMOVE_ITEM_FROM_CART",
                          payload: item,
                        });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
