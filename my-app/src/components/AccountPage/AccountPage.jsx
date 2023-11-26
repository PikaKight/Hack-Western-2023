import "./AccountPage.css";

import NavigationBar from "../Common/NavigationBar/NavigationBar";
import UserAuthentication from "../UserAuthentication/UserAuthentication";
import { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import CodeSnippetTags from "../CodeSnippetTags/CodeSnippetTags";

import { Select, FormControl, MenuItem, InputLabel, Container, TextField, ButtonGroup, Button, FormControlLabel, FormGroup } from '@mui/material';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './dark-theme.css';

const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');

  const [applicantEmailAddress, setApplicantEmailAddress] = useState('');
  const [recruiterEmailAddress, setRecruiterEmailAddress] = useState('');

  const [userType, setUserType] = useState('');
  const [company, setCompany] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [codeOverview, setCodeOverview] = useState('');
  const [resumeLink, setResumeLink] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const savedIsUserLoggedIn = localStorage.getItem("IS_USER_LOGGED_IN");
    setIsLoggedIn(savedIsUserLoggedIn === "yes");

    const savedEmailAddress = localStorage.getItem("USER_EMAIL_ADDRESS");
    if (savedEmailAddress) {
      const parsedEmailAddress = JSON.parse(savedEmailAddress);
      setEmailAddress(parsedEmailAddress);
    }

    const savedApplicantEmailAddress = localStorage.getItem("APPLICANT_EMAIL_ADDRESS");
    if (savedApplicantEmailAddress) {
      const parsedEmailAddress = JSON.parse(savedApplicantEmailAddress);
      setEmailAddress(parsedEmailAddress);
    }

    const savedRecruiterEmailAddress = localStorage.getItem("RECRUITER_EMAIL_ADDRESS");
    if (savedRecruiterEmailAddress) {
      const parsedEmailAddress = JSON.parse(savedRecruiterEmailAddress);
      setEmailAddress(parsedEmailAddress);
    }

    const savedUserType = localStorage.getItem("USER_TYPE");
    if (savedUserType) {
      const parsedUserType = JSON.parse(savedUserType);
      setUserType(parsedUserType);
    }

    const savedCompany = localStorage.getItem("USER_COMPANY");
    if (savedCompany) {
      const parsedCompany = JSON.parse(savedCompany);
      setCompany(parsedCompany);
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

    const savedUserResumeLink = localStorage.getItem("USER_RESUME_LINK");
    if (savedUserResumeLink) {
      const parsedUserResumeLink = JSON.parse(savedUserResumeLink);
      setResumeLink(parsedUserResumeLink);
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
    console.log("user type is: ", userType);
    if (userType === 'Applicant') {
      if (isCheckboxChecked) {
        fetch('http://127.0.0.1:5050/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: emailAddress,
            Code: codeSnippet,
            Description: codeOverview,
            Resume: resumeLink
          })
        })
        .then(res => res.json())
        .then(result => {
          // alert('Sign up succesful, login using new details')
        })
        .catch(error => {
          console.log('Error in UserSignUp.jsx sign up: ', error);
          alert('Error in AccountPage.jsx sign up: ', error);
        })

        navigate("/matching");
      }
      else {
        alert("Please select checkbox");
      }
    }
    else {
      navigate("/matching");
    }
  }

  const handleCodeOverviewChange = (event) => {
    const codeOverview = event.target.value;
    setCodeOverview(codeOverview);
    localStorage.setItem("CODE_OVERVIEW", JSON.stringify(codeOverview));
  }

  const handleCodeSnippetChange = (event) => {
    const codeSnippet = event;
    setCodeSnippet(codeSnippet);
    localStorage.setItem("CODE_SNIPPET", JSON.stringify(codeSnippet));
  }

  const handleResumeLinkChange = (event) => {
    const link = event.target.value;
    setResumeLink(link);
    localStorage.setItem("USER_RESUME_LINK", JSON.stringify(link));
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div>
      <NavigationBar />
      {isLoggedIn ? (
        <Container maxWidth="lg">
          <div class="glass">
            <h1>{userType} Profile</h1>
            {userType === 'Applicant' ? (
              <div>
                <h3>Add Code Snippet Below:</h3>
                <ReactQuill
                  theme="snow"
                  value={codeSnippet}
                  onChange={handleCodeSnippetChange}
                />
                <TextField label="Describe What This Code Does" multiline fullWidth maxRows={5} value={codeOverview} onChange={handleCodeOverviewChange} margin="dense"></TextField>
                <h4>Add tags</h4>
                <CodeSnippetTags />
                <h4>Please attach link to resume: <input type="text" value={resumeLink} onChange={handleResumeLinkChange} style={{ width: "400px" }} /></h4>
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={isCheckboxChecked} onChange={handleCheckboxChange} />} label="I acknowledge that the provided code is a result of my own individual effort and creativity."/>
                </FormGroup>
                <h3>Total Likes Received: </h3>
              </div>
            ) : (
              <div>
                <p>Current company: {company}</p>
                <p>User profiles liked: </p>
              </div>
            )}
            <Button variant="contained" onClick={goToMatchingPage}>Start Matching!</Button>
            <Button variant="contained" onClick={logOut}>Log Out</Button>
          </div>
        </Container>
      ) : (
        <UserAuthentication />
      )}
    </div>
  )
}

export default AccountPage;