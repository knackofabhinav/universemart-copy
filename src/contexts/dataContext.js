import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { reducer } from "../reducer/data-reducer";
import { instance } from "../App";
import { useAuth } from "./authContext";

const DataContext = createContext();

const initialState = {
  productlist: [],
  cart: [],
  productPage: {},
  route: "products",
  wishlist: [],
  totalPrice: 0,
  showAllInventory: false,
  showFastDeliveryOnly: false,
  sortBy: null,
  userId: null,
};

export const DataProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isUserLogin } = useAuth();

  useEffect(() => {
    const loginCredentials = JSON.parse(localStorage?.getItem("credentials"));
    if (loginCredentials && state.userId === null) {
      (async function () {
        try {
          const res = await instance.post("/login", {
            username: loginCredentials.username,
            password: loginCredentials.password,
          });
          console.log(res.data.user);
          dispatch({ type: "LOGGED_IN", payload: res.data.user });
        } catch (err) {
          console.log("no credentials found");
        }
      })();
    }
  }, [dispatch, state.userId]);

  const addToWishlist = async (item) => {
    try {
      if (isUserLogin) {
        setToastText("Adding to wishlist...");
        setShowToast(true);
        const res = await instance.post("/wishlist", {
          userId: state.userId,
          productId: item._id,
        });
        if (res.data.success === false) {
          setToastText("Product Already Exist");
          setShowToast(true);
        }
        if (res.data.success === true) {
          dispatch({ type: "ADD_TO_WISHLIST", payload: res.data.wishlist });
          setToastText("Added to wishlist");
          setShowToast(true);
        }
      } else {
        setToastText("Please Login");
        setShowToast(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async (item) => {
    try {
      const res = await instance.delete(
        `/wishlist/${state.userId}/${item._id}`
      );
      dispatch({ type: "ADD_TO_WISHLIST", payload: res.data.wishlist });
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (item) => {
    if (isUserLogin) {
      try {
        setToastText("Adding to cart...");
        setShowToast(true);
        const res = await instance.post("/cart", {
          userId: state.userId,
          productId: item._id,
          quantity: 1,
        });
        setToastText(`added to cart`);
        dispatch({ type: "ADD_TO_CART", payload: res.data.cart });
      } catch (error) {
        setShowToast(true);
        setToastText("Failed To add...");
        console.log(error);
      }
    } else {
      setToastText("Please Login");
      setShowToast(true);
    }
  };

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        addToWishlist,
        showToast,
        setShowToast,
        setToastText,
        toastText,
        removeFromWishlist,
        addToCart,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
