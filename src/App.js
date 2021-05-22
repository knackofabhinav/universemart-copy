import { useEffect } from "react";
import "./App.css";
import { Cart } from "./pages/Cart/Cart";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/Navigation/NavBar";
import { ProductListing } from "./pages/Product Listing/ProductListing";
import { Wishlist } from "./components/Wishlist/Wishlist";
import { ProductPage } from "./pages/Product Page/ProductPage";
import { useDataContext } from "./contexts/dataContext";
import { Homepage } from "./pages/Homepage/Homepage";
import { Login } from "./pages/Login Page/Login";
import { Signup } from "./pages/Signup/Signup";
import { PrivateRoute } from "./components/Private Route/PrivateRoute";
const axios = require("axios");

export const instance = axios.create({
  baseURL: "https://limitless-bayou-73813.herokuapp.com/",
});

function App() {
  const { dispatch } = useDataContext();

  useEffect(() => {
    (async () => {
      try {
        const dataFromServer = await instance.get("/products");
        dispatch({
          type: "ADDING_DATA_TO_PRODUCTLIST",
          payload: dataFromServer.data.products,
        });
        console.log("Loaded...");
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/products" element={<ProductListing />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <Route path="/productpage" element={<ProductPage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
