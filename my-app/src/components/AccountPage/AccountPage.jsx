import "./AccountPage.css";

import NavigationBar from "../Common/NavigationBar/NavigationBar";
import UserAuthentication from "../UserAuthentication/UserAuthentication";
import { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import CodeSnippetTags from "../CodeSnippetTags/CodeSnippetTags";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [codeOverview, setCodeOverview] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const savedIsUserLoggedIn = localStorage.getItem("IS_USER_LOGGED_IN");
    setIsLoggedIn(savedIsUserLoggedIn === "yes");

    const savedUsername = localStorage.getItem("USER_FULL_NAME");
    if (savedUsername) {
      const parsedUsername = JSON.parse(savedUsername);
      setUsername(parsedUsername);
    }

    const savedUserType = localStorage.getItem("USER_TYPE");
    if (savedUserType) {
      const parsedUserType = JSON.parse(savedUserType);
      setUserType(parsedUserType);
    }

    const savedCodeSnippet = localStorage.getItem("CODE_SNIPPET");
    if (savedCodeSnippet) {
      const parsedCodeSnippet = JSON.parse(savedCodeSnippet);
      setCodeSnippet(parsedCodeSnippet);
    }

    const savedCodeOverview = localStorage.getItem("CODE_OVERVIEW");
    if (savedCodeOverview) {
      const parsedCodeOverview = JSON.parse(savedCodeOverview);
      setCodeOverview(parsedCodeOverview);
    }
  }, [])

  const logOut = () => {
    localStorage.setItem("IS_USER_LOGGED_IN", "no");
    window.location.reload();
  }

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  }

  const goToMatchingPage = () => {
    if (isCheckboxChecked) {
      navigate("/");
    }
    else {
      alert("Please select checkbox");
    }
  }

  const handleCodeOverviewChange = (event) => {
    const codeOverview = event.target.value;
    setCodeOverview(codeOverview);
    localStorage.setItem("CODE_OVERVIEW", JSON.stringify(codeOverview));
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div>
      <NavigationBar />
      {isLoggedIn ? (
        <div>
          <h2>{userType} Account Page!</h2>
          <h4>Name: {username}</h4>
          {userType === 'Applicant' ? (
            <div>
              <h3>Add code snippet below:</h3>
              <ReactQuill
                theme="snow" 
                value={codeSnippet}
                onChange={(content) => setCodeSnippet(content)}
              />
              <div>
                <h4>Brief overview of what this code does.</h4>
                <textarea cols="80" rows="5" value={codeOverview} onChange={handleCodeOverviewChange}></textarea>
              </div>
              <h4>Add tags</h4>
              <CodeSnippetTags />
              <div className="account-page-checkbox">
                <Checkbox {...label} checked={isCheckboxChecked} onChange={handleCheckboxChange} />
                <p>I acknowledge that the provided code is a result of my own individual effort and creativity.</p>
              </div>
            </div>
          ) : (
            <div>
              Company currently working at: 
            </div>
          )}
          <div className="account-page-end-buttons">
            <button onClick={goToMatchingPage}>Start matching!</button>
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