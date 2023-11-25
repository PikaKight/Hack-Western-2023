// components
import NavigationBar from "./components/Common/NavigationBar/NavigationBar";
import LandingPage from "./components/LandingPage/LandingPage";
import UserProfile from "./components/UserProfile/UserProfile";

// dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
