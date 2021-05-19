import { useParams } from "react-router";
import { useDataContext } from "../../contexts/dataContext";
import { useTheme } from "../../contexts/theme-context";
import { instance } from "../../App";
import "./ProductPage.css";
export const ProductPage = () => {
  const {
    theme: { dark, light },
    isDark,
  } = useTheme();
  const {
    state: { cart, userId, productlist, wishlist },
    dispatch,
  } = useDataContext();
  const { id } = useParams();
  const getProductDetails = (productlist, id) =>
    productlist.find((product) => product._id === id);
  const product = getProductDetails(productlist, id);

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
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {product && (
        <div className="product-page-container" style={isDark ? dark : light}>
          <div className="product-image-container">
            <img src={product.image} alt="product" />
          </div>
          <h1 className="product-name">{product.name}</h1>
          <h3 className="product-name">
            Price: ₹{product.price}
            /-
          </h3>
          <div className="buttons-container">
            {cart.find((cartItem) => cartItem.id === product.id) ? (
              <button
                className="btn primary"
                onClick={(e) => {
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
                  e.stopPropagation();
                  setTimeout(() => {
                    dispatch({ type: "HIDE_CART_TOAST" });
                  }, 3000);
                  dispatch({ type: "ADD_TO_CART", payload: product });
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
    </div>
  );
};
