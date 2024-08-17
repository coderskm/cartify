import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser, guestUserLogin } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

/* 
1. simple login page which asks for user's username and password.
2. if username not found or password incorrect then popup message with error is shown.
3. on successfull login user navigates to home page with welcome message.
4. additionally visitor can register themselves by clicking on red text "REGISTER" 
*/

const Login = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGuestUserLogin = () => {
    dispatch(guestUserLogin());
    navigate("/");
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success == false) {
        alert(data.message);
      } else {
        dispatch(setCurrentUser(data));
        navigate("/");
      }

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="heading-text">LOGIN</h1>
        <input
          className="input-field-style"
          placeholder="enter your username..."
          type="text"
          onChange={handleChange}
          name="username"
          id="username"
        />

        <input
          className="input-field-style"
          placeholder="enter your password..."
          type="password"
          onChange={handleChange}
          name="password"
          id="password"
        />
        <button className="btn-style">SUBMIT</button>
      </form>
      <div className="extra-login-feature">
        <button className="btn-style" onClick={handleGuestUserLogin}>
          LOGIN AS GUEST USER
        </button>
        <p className="a-tag-link-style">
          Not Registered? then{" "}
          <Link className="a-tag-text-style" to={"/register"}>
            REGISTER
          </Link>{" "}
        </p>
      </div>
    </>
  );
};

export default Login;
