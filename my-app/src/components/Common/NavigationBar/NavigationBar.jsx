import "./NavigationBar.css";

import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material"

const NavigationBar = () => {
  const navigate = useNavigate();

  const goToUserProfile = () => {
    navigate("/user-profile");
  }

  const goToHome = () => {
    navigate("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Sample Text</Typography>
          <Button color="inherit" onClick={goToHome}>Home</Button>
          <Button color="inherit" onClick={goToUserProfile}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavigationBar;