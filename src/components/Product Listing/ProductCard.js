import "./ProductCard.css";
import { useTheme } from "../../contexts/theme-context";
import { useDataContext } from "../../contexts/dataContext";
import { Link } from "react-router-dom";

export const ProductCard = ({ item }) => {
  const {
    theme: { dark, light },
    isDark,
  } = useTheme();
  const {
    state: { cart, wishlist },
    dispatch,
  } = useDataContext();

  return (
    <Link to={`/product/${item.id}`} className="link-productcard">
      <div key={item.id} className="card" style={isDark ? dark : light}>
        <div className="thumbnail">
          <img className="image" src={item.image} alt="product" />
          <button
            className="close"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation();
              dispatch({ type: "ADD_TO_WISHLIST", payload: item });
              setTimeout(() => {
                dispatch({ type: "HIDE_WISHLIST_TOAST" });
              }, 3000);
            }}
          >
            {wishlist.find(
              (wishlistProduct) => wishlistProduct.id === item.id
            ) ? (
              <i className="fas fa-heart"></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
          </button>
        </div>
        <h3 className="name">{item.name}</h3>
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
              <i class="fas fa-shipping-fast out-of-stock"></i>
            )}
            <p className="price">₹ {item.price}/-</p>
          </div>
          {cart.find((cartItem) => cartItem.id === item.id) ? (
            <Link
              to="/cart"
              style={{
                display: "flex",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <button
                className="btn secondary"
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation();
                }}
              >
                Go To Cart
              </button>
            </Link>
          ) : (
            <button
              className={item.inStock ? "btn primary" : "btn disabled"}
              style={{ width: "100%" }}
              disabled={!item.inStock}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation();
                setTimeout(() => {
                  dispatch({ type: "HIDE_CART_TOAST" });
                }, 3000);
                dispatch({ type: "ADD_TO_CART", payload: item });
              }}
            >
              {item.inStock ? "Add to Cart" : "Out Of Stock"}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};
