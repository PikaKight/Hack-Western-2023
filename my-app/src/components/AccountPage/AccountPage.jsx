import "./AccountPage.css";

import NavigationBar from "../Common/NavigationBar/NavigationBar";
import UserAuthentication from "../UserAuthentication/UserAuthentication";
import { useState } from "react";

const AccountPage = () => {
  const savedIsUserLoggedIn = localStorage.getItem("IS_USER_LOGGED_IN");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (savedIsUserLoggedIn) {
    const parsedIsUserLoggedIn = JSON.parse(savedIsUserLoggedIn);
    setIsLoggedIn(parsedIsUserLoggedIn === "yes");
  }

  return (
    <div>
      <NavigationBar />
      {isLoggedIn ? (
        <h3>Account Page!</h3>
      ) : (
        <UserAuthentication />
      )}
    </div>
  )
}

export default AccountPage;