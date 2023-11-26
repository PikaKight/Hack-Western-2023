// components
import NavigationBar from "./components/Common/NavigationBar/NavigationBar";
import LandingPage from "./components/LandingPage/LandingPage";
import AccountPage from "./components/AccountPage/AccountPage";

// dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#c66dfc',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: '#e3f2fd',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={themeOptions}>
      <Router> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
