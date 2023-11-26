import "./NavigationBar.css";

import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material"

const NavigationBar = () => {
  const navigate = useNavigate();

  const goToAccountPage = () => {
    navigate("/account")
  }

  const goToHomePage = () => {
    navigate("/");
  }

  const goToMatchingPage = () => {
    navigate("/matching");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>App Name</Typography>
          <Button color="inherit" onClick={goToHomePage}>Home</Button>
          <Button color="inherit" onClick={goToAccountPage}>Login</Button>
          <Button color="inherit" onClick={goToMatchingPage}>Matching</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavigationBar;