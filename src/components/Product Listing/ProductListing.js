import { useDataContext } from "../../contexts/dataContext";
import "./ProductListing.css";
import { useTheme } from "../../contexts/theme-context";

export const ProductListing = () => {
  const {
    theme: { dark, light },
    isDark,
  } = useTheme();
  const {
    state: {
      productlist,
      addedToCartToast,
      addedToWishlistToast,
      cart,
      wishlist,
      showAllInventory,
      showFastDeliveryOnly,
      sortBy,
    },
    dispatch,
  } = useDataContext();

  function getSortedData(productList, sortBy) {
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return productlist.sort((a, b) => b["price"] - a["price"]);
    }

    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return productlist.sort((a, b) => a["price"] - b["price"]);
    }
    return productlist;
  }

  function getFilteredData(
    productlist,
    { showFastDeliveryOnly, showAllInventory }
  ) {
    return productlist
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      )
      .filter(({ inStock }) => (showAllInventory ? true : inStock));
  }

  const sortedData = getSortedData(productlist, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showFastDeliveryOnly,
    showAllInventory,
  });

  return (
    <div style={isDark ? dark : light} className="container">
      <fieldset>
        <legend>Sort By Price</legend>
        <label>
          <input
            type="radio"
            name="sort"
            onClick={() => {
              dispatch({ type: "PRICE_HIGH_TO_LOW" });
            }}
            checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
          />
          High To Low
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            onClick={() => {
              dispatch({ type: "PRICE_LOW_TO_HIGH" });
            }}
            checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
          />
          Low to High
        </label>
      </fieldset>
      <fieldset>
        <legend>Filters</legend>
        <label>
          <input
            type="checkbox"
            checked={showAllInventory}
            onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
          />
          Include Out of Stock
        </label>
        <label>
          <input
            type="checkbox"
            checked={showFastDeliveryOnly}
            onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
          />
          Fast Delivery Only
        </label>
      </fieldset>
      <ul className="cardlisting">
        {filteredData.map((item) => {
          return (
            <div
              key={item.id}
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
              <h2 className="name">{item.name}</h2>
              <p className="price">₹ {item.price}/-</p>
              {item.fastDelivery && <p className="price">Fast Delivery</p>}
              {!item.inStock && <p className="price">Out Of Stock</p>}
              {cart.find((cartItem) => cartItem.id === item.id) ? (
                <button
                  className="btn secondary"
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
                    dispatch({ type: "ADD_TO_CART", payload: item });
                  }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </ul>
      {addedToCartToast && <p className="toast-container">Added To Cart</p>}
      {addedToWishlistToast && (
        <p className="toast-container">Added To Wishlist</p>
      )}
    </div>
  );
};
