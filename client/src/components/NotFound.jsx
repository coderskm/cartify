import { useNavigate } from "react-router-dom";

/*
1. This component is loaded when user enters any wrong URL endpoint which is not part of this project
2. Also when logged in user tries to access register or login page then this component is loaded (as logged in user cannot access register and login page)
*/

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="heading-text">not found</h1>

      <div className="btns-container">
        <button className="ok-btn" onClick={() => navigate("/")}>
          GO TO HOME
        </button>
      </div>
    </>
  );
};

export default NotFound;
