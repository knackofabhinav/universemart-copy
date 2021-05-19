import "./ProductCard.css";
import { instance } from "../../App";
import { useTheme } from "../../contexts/theme-context";
import { useDataContext } from "../../contexts/dataContext";
import { Link } from "react-router-dom";

export const ProductCard = ({ item }) => {
  const {
    theme: { dark, light },
    isDark,
  } = useTheme();
  const {
    state: { cart, wishlist, userId, alreadyExists },
    dispatch,
  } = useDataContext();

  const addToWishlist = async (item) => {
    try {
      const res = await instance.post("/wishlist", {
        userId,
        productId: item._id,
      });
      if (res.data.success === false) {
        dispatch({ type: "ALREADY_EXISTS" });
      }
      if (res.data.success === true) {
        dispatch({ type: "ADD_TO_WISHLIST", payload: res.data.wishlist });
      }
      setTimeout(() => {
        dispatch({ type: "HIDE_WISHLIST_TOAST" });
        dispatch({ type: "HIDE_ALREADY_EXIST" });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (item) => {
    try {
      const res = await instance.post("/cart", {
        userId: userId,
        productId: item._id,
        quantity: 1,
      });
      console.log(res.data.cart);
      dispatch({ type: "ADD_TO_CART", payload: res.data.cart });
    } catch (error) {
      console.log(error);
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
                setTimeout(() => {
                  dispatch({ type: "HIDE_CART_TOAST" });
                }, 3000);
              }}
            >
              {item.inStock ? "Add to Cart" : "Out Of Stock"}
            </button>
          )}
          {alreadyExists && (
            <p className="toast-container">Product Already Exists</p>
          )}
        </div>
      </div>
    </Link>
  );
};
