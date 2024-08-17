import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const { isLoggedIn } = useSelector((store) => store.user);
  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NotFound/>} />
        {!isLoggedIn && <Route exact path="/register" element={<Register />} />}
        {!isLoggedIn && <Route exact path="/login" element={<Login />} />}
        <Route element={<PrivateRoute />}>
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;