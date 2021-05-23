import { useDataContext } from "../../contexts/dataContext";
import { useTheme } from "../../contexts/theme-context";
import { Link } from "react-router-dom";
import "./Wishlist.css";

export const Wishlist = () => {
  const {
    theme: { dark, light },
    isDark,
  } = useTheme();
  const {
    state: { wishlist, cart },
    dispatch,
    removeFromWishlist,
    addToCart,
  } = useDataContext();

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
