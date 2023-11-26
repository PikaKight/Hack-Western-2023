import "./RecruiterMatchingPage.css";
import { useState, useEffect } from "react";
import NavigationBar from "../Common/NavigationBar/NavigationBar";
import CodeSnippetTags from "../CodeSnippetTags/CodeSnippetTags";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { ButtonGroup, Button, Container } from "@mui/material";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RecruiterMatchingPage = () => {
  const [codeSnippet, setCodeSnippet] = useState('');

  const [selectedProgrammingLanguageOptions, setSelectedProgrammingLanguageOptions] = useState([]);
  const [selectedProblemTypeOptions, setSelectedProblemTypeOptions] = useState([]);
  const [selectedProjectTypeOptions, setSelectedProjectTypeOptions] = useState([]);
  const [selectedDatabaseOptions, setSelectedDatabaseOptions] = useState([]);
  const [selectedIndustryTargetOptions, setSelectedIndustryTargetOptions] = useState([]);
  

  const [isUserCodeSnippetLiked, setIsUserCodeSnippetLiked] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');

  const [applicantEmailAddress, setApplicantEmailAddress] = useState('');
  const [recruiterEmailAddress, setRecruiterEmailAddress] = useState('');

  const [company, setCompany] = useState('');
  
  useEffect(() => {
    const savedprogrammingLanguageOptions = localStorage.getItem("PROGRAMMING_LANGUAGE_OPTIONS");
    if (savedprogrammingLanguageOptions) {
      const parsedprogrammingLanguageOptions = JSON.parse(savedprogrammingLanguageOptions);
      setSelectedProgrammingLanguageOptions(parsedprogrammingLanguageOptions);
    }

    const savedCodeSnippet = localStorage.getItem("CODE_SNIPPET");
      if (savedCodeSnippet) {
        const parsedCodeSnippet = JSON.parse(savedCodeSnippet);
        setCodeSnippet(parsedCodeSnippet);
      }
  
    const savedproblemTypeOptions = localStorage.getItem("PROBLEM_TYPE_OPTIONS");
    if (savedproblemTypeOptions) {
      const parsedproblemTypeOptions = JSON.parse(savedproblemTypeOptions);
      setSelectedProblemTypeOptions(parsedproblemTypeOptions);
    }
  
    const savedprojectTypeOptions = localStorage.getItem("PROJECT_TYPE_OPTIONS");
    if (savedprojectTypeOptions) {
      const parsedprojectTypeOptions = JSON.parse(savedprojectTypeOptions);
      setSelectedProjectTypeOptions(parsedprojectTypeOptions);
    }
  
    const saveddatabaseOptions = localStorage.getItem("DATABASE_OPTIONS");
    if (saveddatabaseOptions) {
      const parseddatabaseOptions = JSON.parse(saveddatabaseOptions);
      setSelectedDatabaseOptions(parseddatabaseOptions);
    }
  
    const savedindustryTargetOptions = localStorage.getItem("INDUSTRY_TARGET_OPTIONS");
    if (savedindustryTargetOptions) {
      const parsedindustryTargetOptions = JSON.parse(savedindustryTargetOptions);
      setSelectedIndustryTargetOptions(parsedindustryTargetOptions);
    }

    const savedisUserCodeSnippetLiked = localStorage.getItem("IS_USER_CODE_SNIPPET_LIKED");
    if (savedisUserCodeSnippetLiked) {
      const parsedisUserCodeSnippetLiked = JSON.parse(savedisUserCodeSnippetLiked);
      setIsUserCodeSnippetLiked(parsedisUserCodeSnippetLiked);
    }

    const savedEmailAddress = localStorage.getItem("USER_EMAIL_ADDRESS");
    if (savedEmailAddress) {
      const parsedEmailAddress = JSON.parse(savedEmailAddress);
      setEmailAddress(parsedEmailAddress);
    }

    const savedCompany = localStorage.getItem("USER_COMPANY");
    if (savedCompany) {
      const parsedCompany = JSON.parse(savedCompany);
      setCompany(parsedCompany);
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
  }, [])

  const handleUserCodeSnippetLike = () => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5050/getApp'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setApplicantEmailAddress(result[0].Email);
        console.log("the email is: ", applicantEmailAddress);
      } catch (error) {
        alert("Error in Recruiter Matching PAge jsx: ", error);
      }
    };

    fetchData();

    fetch('http://127.0.0.1:5050/addLike', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: "mtuenmuk@uwo.ca",
            Company: company
          })
      })
      .then(res => res.json())
      .then(result => {
          // console.log("the data is: ", result);
      })
      .catch(error => {
          console.log("Error in Matching Page jsx: ", error);
          alert("Error in Matching Page jsx: ", error);
      })

    setIsUserCodeSnippetLiked(true);
  }

  return (
    <>
      <NavigationBar />
      <Container maxWidth="lg">
        <div className="glass">
          {isUserCodeSnippetLiked ? (
            <div>
              <h1>No more code to look at, time to go outside</h1>
            </div>
          ) : (
            <div>
              <div className="recruiter-matching-page"> 
                <div className="recruiter-matching-page-editor">
                  <ReactQuill
                    theme="snow" 
                    value={codeSnippet}
                    readOnly={true}
                  />
                </div>
                <h1>Tags</h1>
                <div className="recruiter-matching-page-tags">
                  <div>
                    <h2>Programming Languages:</h2>
                    {selectedProgrammingLanguageOptions.map((obj, index) => (
                      <h3>{obj.label}</h3>
                    ))}
                  </div>
                  <div>
                    <h2>Problem Type:</h2>
                    {selectedProblemTypeOptions.map((obj, index) => (
                      <h3>{obj.label}</h3>
                    ))}
                  </div>
                  <div>
                    <h2>Project Type:</h2>
                    {selectedProjectTypeOptions.map((obj, index) => (
                      <h3>{obj.label}</h3>
                    ))}
                  </div>
                  <div>
                    <h2>Databases:</h2>
                    {selectedDatabaseOptions.map((obj, index) => (
                      <h3>{obj.label}</h3>
                    ))}
                  </div>
                  <div>
                    <h2>Industry Targets:</h2>
                    {selectedIndustryTargetOptions.map((obj, index) => (
                      <h3>{obj.label}</h3>
                    ))}
                  </div>
                </div>
              </div>
              <Container maxWidth="sm" align="center">
                <ButtonGroup variant="contained">
                    <Button startIcon={<ThumbDownIcon />} size="large"></Button>
                    <Button onClick={handleUserCodeSnippetLike} startIcon={<ThumbUpIcon />} size="large"></Button>
                </ButtonGroup>
              </Container>
            </div>
          )}
        </div>
      </Container>
    </>
  )
}

export default RecruiterMatchingPage;