import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import "./Home.css";

const Home = () => {
  const { currentUser,
    isLoggedIn } = useSelector((store) => store.user);
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="home-heading">Welcome to profile.fyi-cart </h1>
      {isLoggedIn ? (
        currentUser == "guest" ? (
          <div className="userparentcontainer">
            <p className="login-user-text">
              you are logged in as <span className="username-text">guest</span>
            </p>
            <button onClick={()=>navigate("/products")} className="shop-btn-style">SHOP NOW</button>
          </div>
        ) : (
          <div className="userparentcontainer">
            <p className="login-user-text">
              Welcome <span className="username-text">{currentUser.fullname}</span> !!!
            </p>
            <button onClick={()=>navigate("/products")} className="shop-btn-style">SHOP NOW</button>
          </div>
        )
      ) : (
        <div className="home-btns">
          <Link to={"/register"}>
            <button>REGISTER</button>
          </Link>
          <Link to={"/login"}>
            <button>LOGIN</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home