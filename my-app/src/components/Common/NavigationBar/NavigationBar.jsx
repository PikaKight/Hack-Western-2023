import "./NavigationBar.css";

import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const goToUserProfile = () => {
    navigate("/user-profile")
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
          <button onClick={goToUserProfile}>User Profile</button>
        </div>
      </ul>
    </div>
  )
}

export default NavigationBar;