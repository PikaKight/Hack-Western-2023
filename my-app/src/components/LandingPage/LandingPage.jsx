import "./LandingPage.css";

import NavigationBar from "../Common/NavigationBar/NavigationBar";
import { Typography } from "@mui/material";


const LandingPage = () => {
  return (
    <div>
      <NavigationBar/>
      <div>
        <Typography variant="h1">Sample text</Typography>
        <Typography variant="h6">small text small text small text</Typography>
      </div>
    </div>
  )
}

export default LandingPage;