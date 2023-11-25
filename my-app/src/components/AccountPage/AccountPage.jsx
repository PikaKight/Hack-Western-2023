import "./AccountPage.css";

import NavigationBar from "../Common/NavigationBar/NavigationBar";
import UserAuthentication from "../UserAuthentication/UserAuthentication";
import { useEffect, useState } from "react";

const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedIsUserLoggedIn = localStorage.getItem("IS_USER_LOGGED_IN");
    setIsLoggedIn(savedIsUserLoggedIn === "yes");
  }, [])

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