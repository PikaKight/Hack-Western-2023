import "./UserProfile.css";

import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState('');

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

    
  }, [])

  const handleUserTypeChange = (event) => {
    const userType = event.target.value;
    setUserType(userType);
    localStorage.setItem("USER_TYPE", JSON.stringify(userType));
  }

  const handleFullNameChange = () => {
    
  }

  const handleEmailAddressChange = () => {

  }

  const handlePasswordChange = () => {

  }

  const handlePhoneNumberChange = () => {

  }

  return (
    <div>
      <h1>Sign up form</h1>
      <div>
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
      </div>
    </div>
  )
}

export default UserProfile;