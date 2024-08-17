/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, removeProductFromCart } from "../redux/cart/cartSlice";

const ProductItem = ({id, title, price, image }) => {
  const dispatch = useDispatch();
 const { cartItems } = useSelector((store) => store.cart);
  
  const handleAddProductToCart = () => {
    const productObj = { id: id, name: title, price: price, image: image, amount: 1 };
    dispatch(addProductToCart(productObj));
  }
  const handleRemoveProductFromCart = () => {
    dispatch(removeProductFromCart(id));
  }
  return (
    <div className="card-container">
      {<img className="card-image" src={image} alt={title}  /> || (
        <img src={"https://placehold.co/600x400"} alt={title} />
      )}
      <div className="card-name">{title}</div>
      <div className="card-price">₹{price}</div>
      {cartItems.some((item) => item.id == id) ? (
        <button className="danger-btn" onClick={handleRemoveProductFromCart}>
          Remove from cart
        </button>
      ) : (
        <button className="ok-btn" onClick={handleAddProductToCart}>
          Add to cart
        </button>
      )}
    </div>
  );
}

export default ProductItem