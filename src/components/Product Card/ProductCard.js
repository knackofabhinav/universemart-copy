import "./ProductCard.css";
import { useTheme } from "../../contexts/theme-context";
import { useDataContext } from "../../contexts/dataContext";
import { Link } from "react-router-dom";
import { Toast } from "../Toast/Toast";

export const ProductCard = ({ item }) => {
  const {
    theme: { dark, light },
    isDark,
  } = useTheme();
  const {
    state: { cart, wishlist },
    addToWishlist,
    showToast,
    setShowToast,
    toastText,
    addToCart,
  } = useDataContext();

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
