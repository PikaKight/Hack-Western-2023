// components
import NavigationBar from "./components/Common/NavigationBar/NavigationBar";
import LandingPage from "./components/LandingPage/LandingPage";
import AccountPage from "./components/AccountPage/AccountPage";
import UserMatchingPage from "./components/UserMatchingPage/UserMatchingPage";
import RecruiterMatchingPage from "./components/RecruiterMatchingPage/RecruiterMatchingPage";

// dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";


const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#c66dfc',
    },
    text: {
      primary: '#e3f2fd',
    },
  },
});

const App = () => {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const savedUserType = localStorage.getItem("USER_TYPE");
    if (savedUserType) {
      const parsedUserType = JSON.parse(savedUserType);
      setUserType(parsedUserType);
    }
  }, [])

  return (
    <ThemeProvider theme={themeOptions}>
      <Router> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/matching" element={userType === 'Applicant' ? <UserMatchingPage /> : <RecruiterMatchingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
