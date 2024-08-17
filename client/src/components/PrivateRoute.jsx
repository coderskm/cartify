import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

/* 
1. used to make certain component restricted from outside users who are not logged in app 
2. a user can only see products, cart and checkout pages once they login either as user or as guest
3. a visitor can only see register, login and home pages.
*/

export default function PrivateRoute() {
  const { isLoggedIn } = useSelector((state) => state.user);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
