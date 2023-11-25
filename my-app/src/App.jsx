// components
import UserProfile from "./components/UserProfile/UserProfile";

// dependencies
import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <>
      <Route path="/user-profile" element={<UserProfile/>}></Route>
    </>
  )
}

export default App;