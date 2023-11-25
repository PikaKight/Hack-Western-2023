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

  const logOut = () => {
    localStorage.setItem("IS_USER_LOGGED_IN", "no");
    window.location.reload();
  }

  return (
    <div>
      <NavigationBar />
      {isLoggedIn ? (
        <div>
          <h3>Account Page!</h3>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <UserAuthentication />
      )}
    </div>
  )
}

export default AccountPage;