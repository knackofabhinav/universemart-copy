import "./Checkout.css";
import { useDataContext } from "../../contexts/dataContext";

export const Checkout = () => {
  const {
    state: { cart },
  } = useDataContext();
  return (
    <div className="checkout-container">
      <h2>Select Your Payment Mode</h2>
      <ul>
        <li>
          <input type="radio" name="payment" />
          <label>Cash On Delivery</label>
        </li>
        <li>
          <input type="radio" name="payment" />
          <label>Debit Card</label>
        </li>
        <li>
          <input type="radio" name="payment" />
          <label>Credit Card</label>
        </li>
        <li>
          <input type="radio" name="payment" />
          <label>UPI</label>
        </li>
      </ul>
      <h2>Select Your Address</h2>
      <ul className="address">
        <li>
          <input type="radio" name="address" id="address1" />
          <label htmlFor="address1">
            <h3>Home</h3>
            <p>
              50 rd Flr, , Zakaria Bldg, Sherif Devji Street, Yusuf Maharali
              Road, Masjid Bunder (west)
            </p>
            <p>Mumbai - 400003</p>
            <p>Maharastra</p>
          </label>
        </li>
        <li>
          <input type="radio" name="address" id="address2" />
          <label htmlFor="address2">
            <h3>Flat</h3>
            <p>
              50 rd Flr, , Zakaria Bldg, Sherif Devji Street, Yusuf Maharali
              Road, Masjid Bunder (west)
            </p>
            <p>Mumbai - 400003</p>
            <p>Maharastra</p>
          </label>
        </li>
        <li>
          <input type="radio" name="address" id="address3" />
          <label htmlFor="address3">
            <h3>Office</h3>
            <p>
              50 rd Flr, , Zakaria Bldg, Sherif Devji Street, Yusuf Maharali
              Road, Masjid Bunder (west)
            </p>
            <p>Mumbai - 400003</p>
            <p>Maharastra</p>
          </label>
        </li>
      </ul>
      <h2>Total Price</h2>
      <div className="price-container">
        <div className="charges">
          <p>Amount</p>
          <p>
            {cart.length > 0
              ? cart
                  .map((item) => item.price * item.quantity)
                  .reduce((a, b) => a + b)
              : 0}
            /-
          </p>
        </div>
        <div className="charges">
          <p>Delivery</p>
          <p>30/-</p>
        </div>
        <div className="charges">
          <p>GST (18%)</p>
          <p>20/-</p>
        </div>
        <div className="charges">
          <h3>Total</h3>
          <h3>
            {cart.length > 0
              ? cart
                  .map((item) => item.price * item.quantity)
                  .reduce((a, b) => a + b) + 50
              : 0}{" "}
            /-
          </h3>
        </div>
      </div>
    </div>
  );
};
