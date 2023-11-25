import "./AccountPage.css";

import NavigationBar from "../Common/NavigationBar/NavigationBar";
import UserAuthentication from "../UserAuthentication/UserAuthentication";
import { useEffect, useState } from "react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');

  useEffect(() => {
    const savedIsUserLoggedIn = localStorage.getItem("IS_USER_LOGGED_IN");
    setIsLoggedIn(savedIsUserLoggedIn === "yes");

    const savedUsername = localStorage.getItem("USER_FULL_NAME");
    if (savedUsername) {
      const parsedUsername = JSON.parse(savedUsername);
      setUsername(parsedUsername);
    }

    const savedCodeSnippet = localStorage.getItem("CODE_SNIPPET");
    if (savedCodeSnippet) {
      const parsedCodeSnippet = JSON.parse(savedCodeSnippet);
      setCodeSnippet(parsedCodeSnippet);
    }
  }, [])

  const logOut = () => {
    localStorage.setItem("IS_USER_LOGGED_IN", "no");
    window.location.reload();
  }

  const handleCodeSnippetChange = () => {
    localStorage.setItem("CODE_SNIPPET", JSON.stringify(codeSnippet));
  }

  return (
    <div>
      <NavigationBar />
      {isLoggedIn ? (
        <div>
          <h2>Account page!</h2>
          <h4>Name: {username}</h4>
          <h3>Add code snippet below:</h3>
          <ReactQuill
            theme="snow" 
            value={codeSnippet}
            onChange={(content) => setCodeSnippet(content)}
          />
          <div className="account-page-end-buttons">
            <button onClick={handleCodeSnippetChange}>Save</button>
            <button>Start matching!</button>
          </div>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <UserAuthentication />
      )}
    </div>
  )
}

export default AccountPage;