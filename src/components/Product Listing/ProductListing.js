import { useDataContext } from "../../contexts/dataContext";
import "./ProductListing.css";
import { useTheme } from "../../contexts/theme-context";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";

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
            <Link
              key={item._id}
              style={{ textDecoration: "none" }}
              to={`/products/${item._id}`}
            >
              <ProductCard item={item} />
            </Link>
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
