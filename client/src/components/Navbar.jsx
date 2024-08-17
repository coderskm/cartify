import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { setLogoutUser, guestUserLogout } from "../redux/user/userSlice";
import { clearCart } from "../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [menuopen, setMenuopen] = useState(false);
  const { cartItems } = useSelector((store) => store.cart);
  const { currentUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (currentUser == "guest") {
      dispatch(guestUserLogout());
      navigate("/");
      return;
    }
    const res = await fetch("/api/auth/logout");
    const data = await res.json();
    dispatch(setLogoutUser());
    dispatch(clearCart());
    console.log(data);
  };

  return (
    <nav className="">
      <Link to={"/"} className="title">
        profile.fyi-cart
      </Link>
      <div className="menu" onClick={() => setMenuopen(!menuopen)}>
        {menuopen ? "X" : <AiOutlineMenu />}
      </div>
      <ul className={menuopen ? "open" : ""}>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/cart"}>Cart {cartItems.length > 0 && cartItems.length}</NavLink>
        </li>
        <li>
          <NavLink to={"/products"}>Products</NavLink>
        </li>
        <li>
          <NavLink to={"/"} onClick={handleLogout}>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
