import "./MatchingPage.css";

import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import NavigationBar from "../Common/NavigationBar/NavigationBar";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MatchingPage = () => {
    const [companyName, setCompanyName] = useState('');
    const [positionType, setPositionType] = useState('');
    const [companyBio, setCompanyBio] = useState('');
    const [companyContactName, setCompanyContactName] = useState('');
    const [companyContactEmail, setCompanyContactEmail] = useState('');
    const [companyTechStack, setCompanyTechStack] = useState([]);

    const [codeSnippet, setCodeSnippet] = useState('');

    const [companyData, setCompanyData] = useState(null);

    const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);

    useEffect(() => {
        const savedCodeSnippet = localStorage.getItem("CODE_SNIPPET");
        if (savedCodeSnippet) {
            const parsedCodeSnippet = JSON.parse(savedCodeSnippet);
            setCodeSnippet(parsedCodeSnippet);
        }

        const savedCompanyIndex = localStorage.getItem("COMPANY_INDEX");
        if (savedCompanyIndex) {
            const parsedCompanyIndex = JSON.parse(savedCompanyIndex);
            setCurrentCompanyIndex(parsedCompanyIndex);
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://127.0.0.1:5050/getCompany'); 
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setCompanyData(result);
          } catch (error) {
            alert("Error in MatchingPage.jsx file: ", error);
          } 
        };
    
        fetchData();
      }, []); 

      const tempCompanyData = [
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'CodeCrafters', Bio: 'Crafting Code for Excellence', ContactName: 'Eva', ContactEmail: 'eva@example.com', Loc: 'Local', Type: 'In-person', TechStack: ['JavaScript', 'Node.js'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'BreakJet.ai', Bio: 'Breaking Down Projects One at a Time', ContactName: 'Marcus', ContactEmail: 'mtuenmuk@uwo.ca', Loc: 'Online', Type: 'Remote', TechStack: ['ReactJS', 'Python'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'DataDynamo', Bio: 'Mastering Data Science', ContactName: 'Alex', ContactEmail: 'alex@example.com', Loc: 'Online', Type: 'Remote', TechStack: ['Python', 'Pandas'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'SwiftSolutions', Bio: 'Swift Development at its Best', ContactName: 'Sophie', ContactEmail: 'sophie@example.com', Loc: 'Local', Type: 'In-person', TechStack: ['Swift', 'iOS'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'CloudCoders', Bio: 'Coding in the Cloud', ContactName: 'Chris', ContactEmail: 'chris@example.com', Loc: 'Online', Type: 'Remote', TechStack: ['AWS', 'JavaScript'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'CodeCrafters', Bio: 'Crafting Code for Excellence', ContactName: 'Eva', ContactEmail: 'eva@example.com', Loc: 'Local', Type: 'In-person', TechStack: ['JavaScript', 'Node.js'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'DataDynamo', Bio: 'Mastering Data Science', ContactName: 'Alex', ContactEmail: 'alex@example.com', Loc: 'Online', Type: 'Remote', TechStack: ['Python', 'Pandas'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'SwiftSolutions', Bio: 'Swift Development at its Best', ContactName: 'Sophie', ContactEmail: 'sophie@example.com', Loc: 'Local', Type: 'In-person', TechStack: ['Swift', 'iOS'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'CloudCoders', Bio: 'Coding in the Cloud', ContactName: 'Chris', ContactEmail: 'chris@example.com', Loc: 'Online', Type: 'Remote', TechStack: ['AWS', 'JavaScript'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'CodeCrafters', Bio: 'Crafting Code for Excellence', ContactName: 'Eva', ContactEmail: 'eva@example.com', Loc: 'Local', Type: 'In-person', TechStack: ['JavaScript', 'Node.js'] },
      ];
      
      const handleCompanyLike = () => {
        handleCurrentCompanyIndexChange();

        fetch('http://127.0.0.1:5050/likeCompany', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: tempCompanyData[currentCompanyIndex].ContactEmail,
                Name: tempCompanyData[currentCompanyIndex].Name
            })
        })
        .then(res => res.json())
        .then(result => {
            console.log("the data is: ", result);
        })
        .catch(error => {
            // console.log("Error in Matching Page jsx: ", error);
            // alert("Error in Matching Page jsx: ", error);
        })
      }

      const handleCurrentCompanyIndexChange = () => {
        if (currentCompanyIndex < tempCompanyData.length) {
            setCurrentCompanyIndex(currentCompanyIndex + 1);
        }
      }

      return (
        <div>
            <NavigationBar />
            <div className="matching-page">
                <div className="matching-page-card">
                    {tempCompanyData && tempCompanyData[currentCompanyIndex] ? (
                        <div>
                            <p>{tempCompanyData[currentCompanyIndex].Name}</p>
                            <p>{tempCompanyData[currentCompanyIndex].Loc}</p>
                            <p>{tempCompanyData[currentCompanyIndex].Type}</p>
                            <p>{tempCompanyData[currentCompanyIndex].Bio}</p>
                            <p>{tempCompanyData[currentCompanyIndex].ContactName}</p>
                            <p>{tempCompanyData[currentCompanyIndex].ContactEmail}</p>
                        </div>
                    ) : (
                        <h1>Company limit reached</h1>
                    )}
                </div>
                <div className="matching-page-buttons">
                    <button onClick={tempCompanyData[currentCompanyIndex] && handleCompanyLike}>Like</button>
                    <button onClick={tempCompanyData[currentCompanyIndex] && handleCurrentCompanyIndexChange}>Dislike</button>
                </div>
            </div>
        </div>
    );
};

export default MatchingPage;
