import {createContext, useContext, useReducer} from 'react';

const DataContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADDING_DATA_TO_PRODUCTLIST':
            return {
                ...state,
                productlist: action.payload
            }
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: Array.from(new Set([
                    ...state.cart,
                    action.payload
                ])),
                addedToCartToast: true
            }
        case 'HIDE_CART_TOAST':
            return {
                ...state,
                addedToCartToast: false
            }
        case 'INCREMENT_CART_QUANTITY':
            return {
                ...state,
                cart: state
                    .cart
                    .map((item) => item.id === action.payload.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item)
            }
        case 'DECREMENT_CART_QUANTITY':
            return {
                ...state,
                cart: state
                    .cart
                    .map((item) => item.id === action.payload.id
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item)
            }
        case 'REMOVE_ITEM_FROM_CART':
            return {
                ...state,
                cart: state
                    .cart
                    .filter((item) => item.id !== action.payload.id)
            }
        case 'ADD_TO_WISHLIST':
            return {
                ...state,
                wishlist: Array.from(new Set([
                    ...state.wishlist,
                    action.payload
                ])),
                addedToWishlistToast: true

            }
        case 'HIDE_WISHLIST_TOAST':
            return {
                ...state,
                addedToWishlistToast: false
            }
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishlist: state
                    .wishlist
                    .filter(wishlisted => wishlisted.id !== action.payload.id)
            }
        case 'LOAD_THIS_ITEM_ON_PRODUCT_PAGE':
            return {
                ...state,
                productPage: action.payload,
                route: 'productPage'
            }
        case 'CHANGE_ROUTE_TO_PRODUCTS':
            return {
                ...state,
                route: 'products'
            }
        case 'CHANGE_ROUTE_TO_CART':
            return {
                ...state,
                route: 'cart'
            }
        case 'CHANGE_ROUTE_TO_WISHLIST':
            return {
                ...state,
                route: 'wishlist'
            }
        case 'CHANGE_ROUTE_TO_CHECKOUT':
            return {
                ...state,
                route: 'checkout'
            }
        case 'PRICE_HIGH_TO_LOW':
            return {
                ...state,
                productlist: [...state.productlist].sort((a, b) => b.price - a.price)
            }
        case 'PRICE_LOW_TO_HIGH':
            return {
                ...state,
                productlist: [...state.productlist].sort((a, b) => a.price - b.price)
            }
        case 'TOGGLE_INVENTORY':
            return {
                ...state,
                productlist: [...state.productlist].filter(item => item.inStock === false)
            }
        default:
            break;
    }
    return state
}

const initialState = {
    productlist: [],
    cart: [],
    productPage: {},
    route: 'products',
    wishlist: [],
    addedToCartToast: false,
    totalPrice: 0,
    addedToWishlistToast: false,
}

export const DataProvider = ({children}) => {
    const [state,
        dispatch] = useReducer(reducer, initialState)
    return (
        <DataContext.Provider
            value={{
            state,
            dispatch
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => {
    return useContext(DataContext)
}