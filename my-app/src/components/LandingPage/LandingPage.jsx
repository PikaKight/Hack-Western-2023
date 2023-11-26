import "./LandingPage.css";

import { useNavigate } from "react-router-dom";
import NavigationBar from "../Common/NavigationBar/NavigationBar";
import { Typography, Container, Grid, Button } from "@mui/material";


const LandingPage = () => {
  const navigate = useNavigate();

  const goToAccountPage = () => {
    navigate("/account")
  }

  return (
    <div>
      <NavigationBar/>
      <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div class="glass" id="title-text">
                <Typography variant="h2">WELCOME TO</Typography>
                <Typography variant="h2">[APP NAME]</Typography>
                <Typography variant="h5">Revolutionizing Job Referrals!</Typography>
                <Button id="get-started-button" variant="contained" align="center" onClick={goToAccountPage} margin="normal">Get Started</Button>
              </div>
              <div class="glass">
                <Typography variant="h6">Supercharge your job search and open the door to a world of exciting career opportunities.</Typography>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div class="glass">
                
              </div>
            </Grid>
          </Grid>
      </Container>
    </div>
  )
}

export default LandingPage;