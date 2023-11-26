import "./LandingPage.css";

import { useNavigate } from "react-router-dom";
import NavigationBar from "../Common/NavigationBar/NavigationBar";
import { Typography, Button } from "@mui/material";


const LandingPage = () => {
  const navigate = useNavigate();

  const goToAccountPage = () => {
    navigate("/account")
  }

  return (
    <div>
      <NavigationBar/>
      <div className="navigation-bar">
        <h1 className="navigation-bar-title">Welcome to</h1>
        <h2>Revolutionizing Job Referrals!</h2>
        <h2 className="navigation-bar-second-title">Supercharge your job search and open the door to a world of exciting career opportunities.</h2>
        <Button variant="contained" align="center" onClick={goToAccountPage}>Get Started</Button>
      </div>
    </div>
  )
}

export default LandingPage;