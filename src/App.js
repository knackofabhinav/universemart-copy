import { useEffect } from "react";
import "./App.css";
import { Cart } from "./components/Cart/Cart";
import { Routes, Route, Router } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { ProductListing } from "./components/Product Listing/ProductListing";
import { Wishlist } from "./components/Wishlist/Wishlist";
import { ProductPage } from "./components/Product Page/ProductPage";
import { useDataContext } from "./contexts/dataContext";
import { Checkout } from "./components/Checkout/Checkout";
const axios = require("axios");
function App() {
  const {
    state: { route },
    dispatch,
  } = useDataContext();
  useEffect(() => {
    (async () => {
      try {
        const dataFromServer = await axios.get("/api/productlist");
        dispatch({
          type: "ADDING_DATA_TO_PRODUCTLIST",
          payload: dataFromServer.data.productlist,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="productpage" element={<ProductPage />} />
      </Routes>
      {route === "products" && <ProductListing />}
      {route === "cart" && <Cart />}
      {route === "wishlist" && <Wishlist />}
      {route === "productPage" && <ProductPage />}
      {/*route==="checkout" && <Checkout/>*/}
    </div>
  );
}

export default App;
