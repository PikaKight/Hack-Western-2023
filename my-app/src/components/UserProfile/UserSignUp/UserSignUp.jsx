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

  /*
  SignUp
  http://127.0.0.1:5050/signup

  {
      Name,
      Email,
      Password,
      Phone,
      Applicant
  }

  Login
  http://127.0.0.1:5050/login

  {
      Email,
      Password
  }
  */

  const handleUserSignUp = () => {
    if (!(fullName && emailAddress && password && phoneNumber && userType)) {
      alert('Please fill out all the fields');
      return;
    }

    const data = {
      Name: fullName,
      Email: emailAddress,
      Password: password,
      Phone: phoneNumber,
      Applicant: userType === 'Applicant',
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
      alert('Error in UserSignUp.jsx sign up: ', error);
    })
  }

  const handleUserSignIn = () => {
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
      alert('Sign up succesful, login using new details')
    })
    .catch(error => {
      console.log('Error in UserSignUp.jsx sign in: ', error);
    })
  }

  // localStorage.clear();

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

          <button onClick={handleUserSignUp}>Sign Up</button>
        </div>
      ) : (
        <div className="user-profile-sign-up">
          <h1>Sign in form</h1>
          <p>Email address: </p><input type="text" value={emailAddress} onChange={handleEmailAddressChange} placeholder="Enter email" />
          <p>Password: </p><input type="text" value={password} onChange={handlePasswordChange} placeholder="Enter password" />

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

          <button onClick={handleUserSignIn}>Sign In</button>
        </div>
      )}
    </div>
  )
}

export default UserProfile;