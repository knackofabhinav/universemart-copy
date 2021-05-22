import { useDataContext } from "../../contexts/dataContext";
import { useTheme } from "../../contexts/theme-context";
import { instance } from "../../App";
import { Link } from "react-router-dom";
import "./Wishlist.css";

export const Wishlist = () => {
  const {
    theme: { dark, light },
    isDark,
  } = useTheme();
  const {
    state: { wishlist, addedToCartToast, userId, cart },
    dispatch,
  } = useDataContext();

  const removeFromWishlist = async (item) => {
    try {
      const res = await instance.delete(`/wishlist/${userId}/${item._id}`);
      dispatch({ type: "ADD_TO_WISHLIST", payload: res.data.wishlist });
    } catch (error) {
      console.log(error);
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
                {cart.find((cartItem) => cartItem.id === item.id) ? (
                  <button
                    className="btn secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      dispatch({ type: "CHANGE_ROUTE_TO_CART" });
                    }}
                  >
                    Go To Cart
                  </button>
                ) : (
                  <button
                    className="btn primary"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      dispatch({ type: "ADD_TO_CART", payload: item });
                    }}
                  >
                    Add to Cart
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
