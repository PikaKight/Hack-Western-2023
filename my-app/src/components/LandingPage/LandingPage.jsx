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
              <div className="glass" id="title-text">
                <Typography variant="h2">WELCOME TO</Typography>
                <Typography variant="h2" id="app-name">[APP NAME]</Typography>
                <Typography variant="h5">Revolutionizing Job Referrals!</Typography>
                <Button id="get-started-button" variant="contained" align="center" onClick={goToAccountPage} margin="normal">Get Started</Button>
              </div>
              <div class="glass">
                <Typography variant="h6">Supercharge your job search and open the door to a world of exciting career opportunities.</Typography>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="glass" id="title-image">
                <img width="100%" src="https://media.discordapp.net/attachments/1176975406046388347/1178292048818884688/PngItem_5211464.png?ex=65759cfc&is=656327fc&hm=04663850d1c44cc77988707e756ce5b31fc0fa615874bbe6b5440483a3697b10&=&format=webp&width=1350&height=597" alt="-"></img>
              </div>
            </Grid>
          </Grid>
      </Container>
    </div>
  )
}

export default LandingPage;