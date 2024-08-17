import { useNavigate } from "react-router-dom"
const NotFound = () => {
    const navigate = useNavigate();
    return (
      <>
        <div>
          <h1 className="heading-text">not found</h1>
        </div>
        <div className="btns-container">
          <button className="ok-btn" onClick={() => navigate("/")}>
            GO TO HOME
          </button>
        </div>
      </>
    );
}

export default NotFound