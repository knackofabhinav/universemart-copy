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
import { Homepage } from "./components/Homepage/Homepage";
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
        <Route path="/products" element={<ProductListing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/productpage" element={<ProductPage />} />
        <Route path="/" element={<Homepage />}/>
      </Routes>
    </div>
  );
}

export default App;
