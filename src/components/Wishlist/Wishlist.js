import { useDataContext } from "../../contexts/dataContext";
import { useTheme } from "../../contexts/theme-context";
import { instance } from "../../App";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Wishlist.css";
import { useAuth } from "../../contexts/authContext";

export const Wishlist = () => {
  const {
    theme: { dark, light },
    isDark,
  } = useTheme();
  const {
    state: { wishlist, addedToCartToast, userId, cart },
    dispatch,
  } = useDataContext();
  const { isUserLogin } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");

  const removeFromWishlist = async (item) => {
    try {
      const res = await instance.delete(`/wishlist/${userId}/${item._id}`);
      dispatch({ type: "ADD_TO_WISHLIST", payload: res.data.wishlist });
    } catch (error) {
      console.log(error);
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
    <div className="wishlist-container">
      <ul className="cardlisting" style={isDark ? dark : light}>
        {wishlist.map((item) => {
          return (
            <Link to={`/products/${item._id}`} className="link-productcard">
              <div
                key={item._id}
                className="card"
                style={isDark ? dark : light}
                onClick={() =>
                  dispatch({
                    type: "LOAD_THIS_ITEM_ON_PRODUCT_PAGE",
                    payload: item,
                  })
                }
              >
                <div className="thumbnail">
                  <img className="image" src={item.image} alt="product" />
                  <button
                    className="close"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromWishlist(item);
                    }}
                  >
                    X
                  </button>
                </div>
                <h4 className="name">{item.name}</h4>
                <p className="price">₹ {item.price}/-</p>
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
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
