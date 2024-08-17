import "./Checkout.css";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";


const Checkout = () => {
    const { cartItems, finalPrice } = useSelector((store) => store.cart);
    

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
          You need to pay :- <span className="green-text">₹{finalPrice.toFixed(3)}</span>{" "}
        </div>
        <div className="btns-container">
          <Link to={"/cart"}>
            <button className="ok-btn">GO BACK TO CART</button>
          </Link>
          <button className="danger-btn">PAY NOW</button>
        </div>
      
    </div>
  );
}

export default Checkout