import { useDataContext } from "../../contexts/dataContext"
import { useTheme } from "../../contexts/theme-context"
import "./Wishlist.css"

export const Wishlist = () => {
    const {theme:{dark, light}, isDark} = useTheme()
    const {state:{wishlist,addedToCartToast, cart}, dispatch} = useDataContext()
    return(
        <div className="container">
        <ul className="cardlisting" style={isDark
            ? dark
            : light}>
                {wishlist.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="card"
                            style={isDark
                            ? dark
                            : light}
                            onClick={() => dispatch({type: "LOAD_THIS_ITEM_ON_PRODUCT_PAGE", payload: item})}>
                            <div className="thumbnail">
                                <img className="image" src={item.image} alt="product"/>
                                <button
                                    className="close"
                                    onClick={(e) => {
                                    e.stopPropagation()
                                    dispatch({type: "REMOVE_FROM_WISHLIST", payload: item})
                                }}>
                                X
                                </button>
                            </div>
                            <h2 className="name">{item.name}</h2>
                            <p className="price">₹ {item.price}/-</p>
                            {cart.find((cartItem) => cartItem.id===item.id)
                                ?
                                <button className="btn secondary" 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    dispatch({type: "CHANGE_ROUTE_TO_CART"})
                                }}>
                                            Go To Cart
                                </button>
                                :
                                <button
                                className="btn primary"
                                onClick={(e) => {
                                e.stopPropagation()
                                setTimeout(() => {dispatch({type:"HIDE_CART_TOAST"})}, 3000)
                                dispatch({type: "ADD_TO_CART", payload: item})
                            }}>Add to Cart</button>}
                        </div>
                    )
                })}
            </ul>
            {addedToCartToast && <p className="toast-container">Added To Cart</p>} 
        </div>
    )
}