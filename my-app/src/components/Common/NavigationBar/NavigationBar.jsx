import "./NavigationBar.css";

import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const goToAccountPage = () => {
    navigate("/account")
  }

  const goToHomePage = () => {
    navigate("/");
  }

  return (
    <div className="navigation-bar">
      <ul className="navigation-bar-list">
        <h1>Navigation Bar</h1>
        <div>
          <button onClick={goToHomePage}>Home</button>
          <button onClick={goToAccountPage}>Account</button>
        </div>
      </ul>
    </div>
  )
}

export default NavigationBar;