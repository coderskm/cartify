import "./Checkout.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/* 
1. simply renders list of items user have added to cart which they need to order.
2. shows detail about an item's quantity and total amount of each quantity.
3. additionally we can see whether total amount is discounted by how much or not discounted at all
*/

const Checkout = () => {
  const { cartItems, totalPrice, finalPrice, discountVal, discountType } = useSelector((store) => store.cart);

  return (
    <div>
      <h1 className="heading-text">Order Summary</h1>
      <div className="parent-grid">
        {cartItems.map((item, idx) => (
          <div className="order-item" key={idx}>
            <div>{item.name}</div>
            {<img src={item.image} alt={item.name} height={100} /> || (
              <img src={"https://placehold.co/100"} alt={item.name} />
            )}
            <div>
              Total quantity:- <span className="red-text">{item.amount}</span>
            </div>
            <div>
              Total price of product:- <span className="green-text">₹{(item.amount * item.price).toFixed(3)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="price-style">
        You need to pay :-{" "}
        <span className="green-text">
          ₹{finalPrice == 0 ? totalPrice.toFixed(3) : finalPrice.toFixed(3)}&nbsp;
          {discountType == "no-discount" ? (
            ""
          ) : discountType == "fixed" ? (
            <>
              with <span className="red-text"> ₹{discountVal} </span> off
            </>
          ) : (
            <>
              with <span className="red-text">{discountVal}% </span> off
            </>
          )}
        </span>
      </div>
      <div className="btns-container">
        <Link to={"/cart"}>
          <button className="ok-btn">go back to cart</button>
        </Link>
        <button className="danger-btn" onClick={()=>alert('more features and bug improvements in process..')}>pay now</button>
      </div>
    </div>
  );
};

export default Checkout;
