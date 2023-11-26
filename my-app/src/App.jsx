// components
import NavigationBar from "./components/Common/NavigationBar/NavigationBar";
import LandingPage from "./components/LandingPage/LandingPage";
import AccountPage from "./components/AccountPage/AccountPage";
import MatchingPage from "./components/MatchingPage/MatchingPage";

// dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/matching" element={<MatchingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
