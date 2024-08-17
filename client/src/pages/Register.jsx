import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({});
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
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
        navigate("/login");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="heading-text">Register</h1>
        <input
          className="input-field-style"
          placeholder="enter your full name..."
          type="text"
          onChange={handleChange}
          name="fullname"
          id="fullname"
        />
        <input
          className="input-field-style"
          placeholder="enter your email..."
          type="email"
          onChange={handleChange}
          name="email"
          id="email"
        />
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

      <p className="a-tag-link-style">
        Already Registered? then{" "}
        <Link className="a-tag-text-style" to={"/login"}>
          LOGIN
        </Link>{" "}
      </p>
    </>
  );
};

export default Register;
