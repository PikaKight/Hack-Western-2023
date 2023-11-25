// components
import NavigationBar from "./components/Common/NavigationBar/NavigationBar";
import LandingPage from "./components/LandingPage/LandingPage";
import UserAuthentication from "./components/UserAuthentication/UserAuthentication";
import AccountPage from "./components/AccountPage/AccountPage";

// dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Router>
  );
};

export default App;
