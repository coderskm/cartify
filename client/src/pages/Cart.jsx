import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import {
  calculateTotalPrice,
  totalMoneyToBePaid,
  setDiscountVal,
  setDiscountType,
  clearCart,
} from "../redux/cart/cartSlice";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/*
1. cart page component inside which product added to cart are rendered.
2. here user can see total amount they need to pay
3. also discount value can be added in two formats :- fixed discount and percentage discount
4. user can navigate to checkout page on click of button to see which items they have ordered.
*/

const Cart = () => {
  const { cartItems, totalPrice, finalPrice } = useSelector((store) => store.cart);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [discountValue, setDiscountValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectDiscountType = useRef(null);

  const handleDiscountValue = (e) => {
    setButtonDisabled(false);
    let inputValue = e.target.value;
    if (inputValue.trim() == "" || inputValue.trim() == "-" || inputValue.trim() == "e" || !isNaN(inputValue)) {
      setDiscountValue(inputValue <= "0" ? "" : inputValue);
    }
  };

  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [cartItems]);

  if (cartItems.length == 0) {
    return (
      <div className="empty-cart-style">
        <h1 className="heading-text">CART IS EMPTY</h1>
        <button className="shop-btn-style" onClick={() => navigate("/products")}>
          SHOP NOW
        </button>
      </div>
    );
  }

  const applyDiscount = () => {
    if (selectDiscountType.current.value == "fixed") {
      if (discountValue == totalPrice) {
        alert("discount value should never be equal to total price");
        return;
      }
      if (discountValue > totalPrice) {
        alert("discount value should be less than total price");
        setDiscountValue("");
        return;
      }
      let priceAfterDiscount = totalPrice - discountValue;
      dispatch(totalMoneyToBePaid(priceAfterDiscount));
      dispatch(setDiscountVal(discountValue));
      dispatch(setDiscountType(selectDiscountType.current.value));
      setDiscountValue("");
      setButtonDisabled(true);
    } else if (selectDiscountType.current.value == "percentage") {
      if (discountValue == 100) {
        alert("percentage discount value can never be 100");
        return;
      }
      if (discountValue < 0 || discountValue > 100) {
        alert("invalid percentage discount value");
        setDiscountValue("");
        return;
      }
      let priceAfterDiscount = totalPrice - totalPrice * (discountValue / 100);
      dispatch(totalMoneyToBePaid(priceAfterDiscount));
      dispatch(setDiscountVal(discountValue));
      dispatch(setDiscountType(selectDiscountType.current.value));
      setDiscountValue("");
      setButtonDisabled(true);
    } else {
      alert("select a discount type");
      return;
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <h1 className="heading-text">Total Products:- {cartItems.length}</h1>
      <div className="parent-grid">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <div className="price-style">
        Subtotal :- <span className="red-text">₹ {totalPrice.toFixed(3)}</span>
      </div>
      <div className="discount-container">
        <select className="select-style" defaultValue={"no-discount"} ref={selectDiscountType}>
          <option value="no-discount">Select Discount Type</option>
          <option value="fixed">Fixed discounts</option>
          <option value="percentage">Percentage discounts</option>
        </select>
        <input
          className="discount-value"
          value={discountValue}
          type="number"
          onChange={handleDiscountValue}
          placeholder="enter discount value"
        />
        <button className="apply-btn" disabled={buttonDisabled} onClick={applyDiscount}>
          Apply
        </button>
      </div>
      <div className="price-style">
        total price :-{" "}
        <span className="green-text">₹ {finalPrice == 0 ? totalPrice.toFixed(3) : finalPrice.toFixed(3)}</span>
      </div>
      <div className="btns-container">
        <button className="danger-btn" onClick={() => dispatch(clearCart())}>
          clear cart
        </button>

        <button className="ok-btn" onClick={handleCheckout}>
          checkout
        </button>
      </div>
    </>
  );
};

export default Cart;
