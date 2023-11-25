import "./UserSignUp.css";

import * as React from 'react';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState('');
  const [userProfile, setUserProfile] = useState([]);
  const [isSignUpSelected, setIsSignUpSelected] = useState(true);

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

    const savedPassword = localStorage.getItem("USER_PASSWORD");
    if (savedPassword) {
      const parsedPassword = JSON.parse(savedPassword);
      setPassword(parsedPassword);
    }

    const savedPhoneNumber = localStorage.getItem("USER_PHONE_NUMBER");
    if (savedPhoneNumber) {
      const parsedPhoneNumber = JSON.parse(savedPhoneNumber);
      setPhoneNumber(parsedPhoneNumber);
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
    localStorage.setItem("USER_PASSWORD", JSON.stringify(password));
  }

  const handlePhoneNumberChange = (event) => {
    const phoneNumber = event.target.value;
    setPhoneNumber(phoneNumber);
    localStorage.setItem("USER_PHONE_NUMBER", JSON.stringify(phoneNumber));
  }

  const handleSignUpOrSignIn = (item) => {
    if (item === "Sign Up") {
      setIsSignUpSelected(true);
    }
    else {
      setIsSignUpSelected(false);
    }
  }

  return (
    <div>
      <button onClick={() => handleSignUpOrSignIn("Sign Up")}>Sign Up</button> / <button onClick={() => handleSignUpOrSignIn("Sign In")}>Sign In</button>
      {isSignUpSelected ? (
        <div className="user-profile-sign-up">
          <h1>Sign up form</h1>
          <p>Full name: </p><input type="text" value={fullName} onChange={handleFullNameChange} />
          <p>Email address: </p><input type="text" value={emailAddress} onChange={handleEmailAddressChange} />
          <p>Password: </p><input type="text" value={password} onChange={handlePasswordChange} />
          <p>Phone number: </p><input type="number" value={phoneNumber} onChange={handlePhoneNumberChange} />

          <div className="user-profile-user-type">
            <FormControl fullWidth>
              <InputLabel>User Type</InputLabel>
              <Select
                value={userType}
                onChange={handleUserTypeChange}
              >
                <MenuItem value={'Applicant'}>Applicant</MenuItem>
                <MenuItem value={'Recruiter'}>Recruiter</MenuItem>
              </Select>
            </FormControl>
          </div>

          <button>Submit</button>
        </div>
      ) : (
        <div className="user-profile-sign-up">
          <h1>Sign in form</h1>
          <p>Full name: </p><input type="text" value={fullName} onChange={handleFullNameChange} />
          <p>Email address: </p><input type="text" value={emailAddress} onChange={handleEmailAddressChange} />
          <p>Password: </p><input type="text" value={password} onChange={handlePasswordChange} />

          <div className="user-profile-user-type">
            <FormControl fullWidth>
              <InputLabel>User Type</InputLabel>
              <Select
                value={userType}
                onChange={handleUserTypeChange}
              >
                <MenuItem value={'Applicant'}>Applicant</MenuItem>
                <MenuItem value={'Recruiter'}>Recruiter</MenuItem>
              </Select>
            </FormControl>
          </div>

          <button>Submit</button>
        </div>
      )}
    </div>
  )
}

export default UserProfile;