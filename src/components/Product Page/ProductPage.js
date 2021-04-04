import {useDataContext} from "../../contexts/dataContext"
import {useTheme} from "../../contexts/theme-context"
import "./ProductPage.css"
export const ProductPage = () => {
    const {
        theme: {
            dark,
            light
        },
        isDark
    } = useTheme()
    const {state: {
            productPage, cart
        }, dispatch} = useDataContext()
    return (
        <div
            className="product-page-container"
            style={isDark
            ? dark
            : light}>
            <div className="product-image-container">
                <img src={productPage.image} alt="product"/>
            </div>
            <h1 className="product-name">{productPage.name}</h1>
            <h3 className="product-name">Price: ₹{productPage.price}
                /-</h3>
            <div className="buttons-container">
            {cart.find((cartItem) => cartItem.id===productPage.id)
                ?
                <button className="btn primary" 
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
                dispatch({type: "ADD_TO_CART", payload: productPage})
            }}>Add to Cart</button>}
                <button className="btn secondary"
                onClick={() => {
                    dispatch({type: "ADD_TO_WISHLIST", payload: productPage})
                }}
                >Add To Wishlist</button>
            </div>
            <h2 className="product-name">Product Description</h2>
            <h3 className="product-name">Author:</h3> <p className="product-name">{productPage.description.author.name}</p>
            <h3 className="product-name">About</h3><p className="product-name">{productPage.description.author.about}</p>
            <h3 className="product-name">Reviews</h3>
            <ul className="review-list">
                {productPage
                    .description
                    .review
                    .map((item) => <li key={item} className="review">{item}</li>)}
            </ul>
        </div>
    )
}