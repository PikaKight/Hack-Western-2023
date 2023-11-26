import "./UserAuthentication.css";

import * as React from 'react';
import { useState, useEffect } from 'react';
import LoadingIcons from 'react-loading-icons'
import { Select, FormControl, MenuItem, InputLabel, Container, TextField, ButtonGroup, Button } from '@mui/material';

import { useNavigate } from "react-router-dom";

const UserProfile = () => {
const [fullName, setFullName] = useState('');
const [emailAddress, setEmailAddress] = useState('');

const [applicantEmailAddress, setApplicantEmailAddress] = useState('');
const [recruiterEmailAddress, setRecruiterEmailAddress] = useState('');

const [password, setPassword] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [company, setCompany] = useState('');
const [userType, setUserType] = useState('');
const [userProfile, setUserProfile] = useState([]);
const [isSignUpSelected, setIsSignUpSelected] = useState(false);

const navigate = useNavigate();

useEffect(() => {
  const savedFullName = localStorage.getItem("USER_FULL_NAME");
  if (savedFullName) {
    const parsedFullName = JSON.parse(savedFullName);
    setFullName(parsedFullName);
  }

  const savedEmailAddress = localStorage.getItem("USER_EMAIL_ADDRESS");
  if (savedEmailAddress) {
    const parsedEmailAddress = JSON.parse(savedEmailAddress);
    setEmailAddress(parsedEmailAddress);
  }

  const savedApplicantEmailAddress = localStorage.getItem("APPLICANT_EMAIL_ADDRESS");
  if (savedApplicantEmailAddress) {
    const parsedEmailAddress = JSON.parse(savedApplicantEmailAddress);
    setApplicantEmailAddress(parsedEmailAddress);
  }

  const savedRecruiterEmailAddress = localStorage.getItem("RECRUITER_EMAIL_ADDRESS");
  if (savedRecruiterEmailAddress) {
    const parsedEmailAddress = JSON.parse(savedRecruiterEmailAddress);
    setRecruiterEmailAddress(parsedEmailAddress);
  }

  const savedPhoneNumber = localStorage.getItem("USER_PHONE_NUMBER");
  if (savedPhoneNumber) {
    const parsedPhoneNumber = JSON.parse(savedPhoneNumber);
    setPhoneNumber(parsedPhoneNumber);
  }

  const savedCompany = localStorage.getItem("USER_COMPANY");
  if (savedCompany) {
    const parsedCompany = JSON.parse(savedCompany);
    setCompany(parsedCompany);
  }

  const savedUserType = localStorage.getItem("USER_TYPE");
  if (savedUserType) {
    const parsedUserType = JSON.parse(savedUserType);
    setUserType(parsedUserType);
  }

  const savedUserProfile = localStorage.getItem("USER_PROFILE")    ;
  if (savedUserProfile) {
    const parsedUserProfile = JSON.password(savedUserProfile);
    setUserProfile(parsedUserProfile);
  }
}, [])

const handleUserTypeChange = (event) => {
  const userType = event.target.value;
  setUserType(userType);
  localStorage.setItem("USER_TYPE", JSON.stringify(userType));
}

const handleFullNameChange = (event) => {
  const fullName = event.target.value;
  setFullName(fullName);
  localStorage.setItem("USER_FULL_NAME", JSON.stringify(fullName));
}

const handleEmailAddressChange = (event) => {
  const emailAddress = event.target.value;
  setEmailAddress(emailAddress);
  localStorage.setItem("USER_EMAIL_ADDRESS", JSON.stringify(emailAddress));
}

const handlePasswordChange = (event) => {
  const password = event.target.value;
  setPassword(password);
}

const handlePhoneNumberChange = (event) => {
  const phoneNumber = event.target.value;
  setPhoneNumber(phoneNumber);
  localStorage.setItem("USER_PHONE_NUMBER", JSON.stringify(phoneNumber));
}

const handleCompanyChange = (event) => {
  const company = event.target.value;
  setCompany(company);
  localStorage.setItem("USER_COMPANY", JSON.stringify(company));
}

const handleUserAuthentication = (item) => {
  if (item === "Sign Up") {
    setIsSignUpSelected(true);
  }
  else {
    setIsSignUpSelected(false);
  }
}

const handleUserSignUp = () => {
  if (!(fullName && emailAddress && password && phoneNumber && userType)) {
    alert('Please fill out all the fields');
    return;
  }

  if (userType === 'Applicant') {
    localStorage.setItem("APPLICANT_EMAIL_ADDRESS", JSON.stringify(emailAddress));
  }
  else {
    localStorage.setItem("RECRUITER_EMAIL_ADDRESS", JSON.stringify(emailAddress));
  }

  const data = {
    Name: fullName,
    Email: emailAddress,
    Password: password,
    Phone: phoneNumber,
    Applicant: userType === 'Applicant',
    Company: company,
  }

  fetch('http://127.0.0.1:5050/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result => {
    alert('Sign up succesful, login using new details')
  })
  .catch(error => {
    console.log('Error in UserSignUp.jsx sign up: ', error);
    alert('Error in UserSignUp.jsx sign up: ', error);
  })
}

const handleUserLogin = () => {
  if (!(emailAddress && password)) {
    alert('Please fill out all the fields');
    return;
  }

  const data = {
    Email: emailAddress,
    Password: password
  }

  fetch('http://127.0.0.1:5050/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result => {
    if (result['msg'] === "Logged In") {
      localStorage.setItem("IS_USER_LOGGED_IN", "yes");
      window.location.reload();
      navigate("/account");
    }
    else {
      alert("Password incorrect");
    }
  })
  .catch(error => {
    alert("Account does not exist, please create one");
  })
}

// localStorage.clear();

return (
  <div>
    <div class="user-profile">
      <Container maxWidth="sm">
        <div class="glass">
          <ButtonGroup variant="contained">
            <Button onClick={() => handleUserAuthentication("Login")}>Login</Button>
            <Button onClick={() => handleUserAuthentication("Sign Up")}>Sign Up</Button>
          </ButtonGroup>
          {isSignUpSelected ? (
            <div className="user-profile-sign-up">
              <h1>Sign Up</h1>
              <TextField fullWidth label="Full Name" variant="outlined" size="small" value={fullName} onChange={handleFullNameChange} margin="dense" />
              <TextField fullWidth label="Email Address" variant="outlined" size="small" value={emailAddress} onChange={handleEmailAddressChange} margin="dense" />
              <TextField fullWidth label="Password" variant="outlined" size="small" value={password} onChange={handlePasswordChange} type="password" margin="dense" />
              <TextField fullWidth label="Phone number" variant="outlined" size="small" type="number" value={phoneNumber} onChange={handlePhoneNumberChange} margin="dense"/>
              <FormControl fullWidth margin="dense">
                <InputLabel id="user-type-label">User Type</InputLabel>
                <Select value={userType} onChange={handleUserTypeChange} labelId="user-type-label" label="User Type">
                  <MenuItem value={'Applicant'}>Applicant</MenuItem>
                  <MenuItem value={'Recruiter'}>Recruiter</MenuItem>
                </Select>
              </FormControl>
              {userType === 'Recruiter' && (
                <TextField fullWidth label="Company" variant="outlined" size="small" type="text" value={company} onChange={handleCompanyChange} margin="dense"/>  
              )}
              <Button variant="contained" onClick={handleUserSignUp}>Sign Up</Button>
            </div>
          ) : (
            <div className="user-profile-sign-up">
              <h1>Login form</h1>
              <TextField fullWidth label="Email Address" variant="outlined" size="small" value={emailAddress} onChange={handleEmailAddressChange} margin="dense" />
              <TextField fullWidth label="Password" variant="outlined" size="small" value={password} onChange={handlePasswordChange} type="password" margin="dense" />
              <Button variant="contained" onClick={handleUserLogin}>Login</Button>
            </div>
          )}
          </div>
        </Container>
      </div>
    </div>
  )
}

export default UserProfile;