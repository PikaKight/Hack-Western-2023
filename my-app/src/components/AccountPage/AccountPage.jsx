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

const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
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
        <Container maxWidth="lg">
          <div class="glass">
            <h1>Profile</h1>
            <h4>Name: {username}</h4>
            <h3>Add Code Snippet Below:</h3>
            <ReactQuill
              theme="snow" 
              value={codeSnippet}
              onChange={(content) => setCodeSnippet(content)}
            />
            <TextField label="Describe What This Code Does" multiline fullWidth maxRows={5} value={codeOverview} onChange={handleCodeOverviewChange} margin="dense"></TextField>
            <h4>Add tags</h4>
            <CodeSnippetTags />
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={isCheckboxChecked} onChange={handleCheckboxChange} />} label="I acknowledge that the provided code is a result of my own individual effort and creativity."/>
            </FormGroup>
            <Button variant="contained" onClick={goToMatchingPage}>Start Matching!</Button>
            <Button variant="outlined" onClick={logOut}>Log Out</Button>
          </div>
        </Container>
      ) : (
        <UserAuthentication />
      )}
    </div>
  )
}

export default AccountPage;