import {useDataContext} from "../../contexts/dataContext"
import "./Cart.css"
import {useTheme} from "../../contexts/theme-context"

export const Cart = () => {
    const {state: {
            cart
        }, dispatch} = useDataContext()
    const {
        theme: {
            dark,
            light
        },
        isDark
    } = useTheme()
    return (
        <div
            style={isDark
            ? dark
            : light}
            className="cart-container">
            <h1 className="total-amount">Total Price: ₹ {cart.length > 0
                    ? cart
                        .map(item => item.price * item.quantity)
                        .reduce((a, b) => a + b)
                    : 0}/-</h1>
            <ul className="cart-list">
                {cart.map((item) => {
                    return (
                        <li key={item.id}>
                            <div
                                className="card text horizontal"
                                style={isDark
                                ? dark
                                : light}
                                onClick={() => dispatch({type: "LOAD_THIS_ITEM_ON_PRODUCT_PAGE", payload: item})}>
                                <img className="product-image" src={item.image} alt="product"/>
                                <div>
                                    <h2>{item.name}</h2>
                                    <h3>₹ {item.price}/-</h3>
                                </div>

                                <div className="links">
                                    <p>Quantity:</p>
                                    <p>
                                        <button
                                            className="btn primary"
                                            onClick={(e) => {
                                            e.stopPropagation()
                                            dispatch({type: "INCREMENT_CART_QUANTITY", payload: item})
                                        }}>+</button>{item.quantity}
                                        <button
                                            className="btn primary"
                                            disabled={item.quantity === 1
                                            ? true
                                            : false}
                                            onClick={(e) => {
                                            e.stopPropagation()
                                            dispatch({type: "DECREMENT_CART_QUANTITY", payload: item})
                                        }}>-</button>
                                    </p>
                                    <button
                                        className="btn secondary text"
                                        onClick={(e) => {
                                        e.stopPropagation()
                                        dispatch({type: "REMOVE_ITEM_FROM_CART", payload: item})
                                    }}>Remove</button>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
            {/*<button 
            className="btn primary checkout"
            onClick={()=>{dispatch({type:"CHANGE_ROUTE_TO_CHECKOUT"})}}
            >Checkout</button>*/}
        </div>
    )
}