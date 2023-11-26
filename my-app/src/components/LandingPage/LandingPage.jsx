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
      <div>
        <Typography variant="h1" align="center">Sample text</Typography>
        <Typography variant="h6" align="center">small text small text small text</Typography>
        <Button variant="contained" align="center" onClick={goToAccountPage}>Get Started</Button>
      </div>
    </div>
  )
}

export default LandingPage;