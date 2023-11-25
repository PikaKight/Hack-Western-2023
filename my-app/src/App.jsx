// components
import UserProfile from "./components/UserProfile/UserProfile";

// dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
