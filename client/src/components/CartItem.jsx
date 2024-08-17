/* eslint-disable react/prop-types */
import "./CartItem.css";
import { useDispatch } from "react-redux";
import { removeProductFromCart, increaseAmountOfProduct, decreaseAmountOfProduct } from "../redux/cart/cartSlice";

/* 
1. component which describes functionality and structure of each product item added into cart 
2. each item's amount can be increased and decreased with available '+' and '-' buttons respectively
3. additionally item can be removed from cart by clicking on ' REMOVE PRODUCT FROM CART' button
*/

const CartItem = ({ id, name, price, image, amount }) => {
  const dispatch = useDispatch();

  const handleRemoveProductFromCart = () => {
    dispatch(removeProductFromCart(id));
  };

  const handleAmountIncrease = () => {
    dispatch(increaseAmountOfProduct(id));
  };

  const handleAmountDecrease = () => {
    if (amount == 1) {
      dispatch(removeProductFromCart(id));
    } else {
      dispatch(decreaseAmountOfProduct(id));
    }
  };

  return (
    <div className="card-container">
      {<img className="card-image" src={image} alt={name} /> || <img src={"https://placehold.co/600x400"} alt={name} />}
      <div className="card-name">{name}</div>
      <div className="card-price">₹{price}</div>
      <div className="cart-btn">
        <button className="increase-btn" onClick={handleAmountIncrease}>
          +
        </button>
        <span className="item-amount">{amount}</span>
        <button className="decrease-btn" onClick={handleAmountDecrease}>
          -
        </button>
      </div>
      <button className="danger-btn" onClick={handleRemoveProductFromCart}>
        REMOVE PRODUCT FROM CART
      </button>
    </div>
  );
};

export default CartItem;
