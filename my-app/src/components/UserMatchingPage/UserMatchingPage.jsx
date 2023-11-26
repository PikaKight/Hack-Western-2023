import "./UserMatchingPage.css";

import { useEffect, useState } from "react";
import { Container, ButtonGroup, Button } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
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

    const tempCompanyData = [
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'CodeCrafters', Bio: 'Crafting Code for Excellence', ContactName: 'Eva', ContactEmail: 'eva@example.com', Loc: 'Local', Type: 'In-person', Tech: ['JavaScript', 'Node.js'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'BreakJet.ai', Bio: 'Breaking Down Projects One at a Time', ContactName: 'Marcus', ContactEmail: 'mtuenmuk@uwo.ca', Loc: 'Online', Type: 'Remote', Tech: ['ReactJS', 'Python'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'DataDynamo', Bio: 'Mastering Data Science', ContactName: 'Alex', ContactEmail: 'alex@example.com', Loc: 'Online', Type: 'Remote', Tech: ['Python', 'Pandas'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'SwiftSolutions', Bio: 'Swift Development at its Best', ContactName: 'Sophie', ContactEmail: 'sophie@example.com', Loc: 'Local', Type: 'In-person', Tech: ['Swift', 'iOS'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'CloudCoders', Bio: 'Coding in the Cloud', ContactName: 'Chris', ContactEmail: 'chris@example.com', Loc: 'Online', Type: 'Remote', Tech: ['AWS', 'JavaScript'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'CodeCrafters', Bio: 'Crafting Code for Excellence', ContactName: 'Eva', ContactEmail: 'eva@example.com', Loc: 'Local', Type: 'In-person', Tech: ['JavaScript', 'Node.js'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'DataDynamo', Bio: 'Mastering Data Science', ContactName: 'Alex', ContactEmail: 'alex@example.com', Loc: 'Online', Type: 'Remote', Tech: ['Python', 'Pandas'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'SwiftSolutions', Bio: 'Swift Development at its Best', ContactName: 'Sophie', ContactEmail: 'sophie@example.com', Loc: 'Local', Type: 'In-person', Tech: ['Swift', 'iOS'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'CloudCoders', Bio: 'Coding in the Cloud', ContactName: 'Chris', ContactEmail: 'chris@example.com', Loc: 'Online', Type: 'Remote', Tech: ['AWS', 'JavaScript'] },
        { Applicants: ['mtuenmuk@uwo.ca'], Name: 'CodeCrafters', Bio: 'Crafting Code for Excellence', ContactName: 'Eva', ContactEmail: 'eva@example.com', Loc: 'Local', Type: 'In-person', Tech: ['JavaScript', 'Node.js'] },
      ];

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
        tempCompanyData.map((companyObject, index) => {
            fetch('http://127.0.0.1:5050/addProfile', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: companyObject['Name'],
                    Loc: companyObject['Loc'],
                    Type: companyObject['Type'],
                    Tech: companyObject['Tech'],
                    ContactName: companyObject['ContactName'],
                    ContactEmail: companyObject['ContactEmail'],
                    Bio: companyObject['Bio']
                })
            })
            .then(res => res.json())
            .then(result => {
                console.log("the data is: ", result);
            })
            .catch(error => {
                console.log("Error in Matching Page jsx: ", error);
                alert("Error in Matching Page jsx: ", error);
            })
        })

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
                <Container maxWidth="md">
                    <div className="glass">
                        <Container maxWidth="md" align="center">
                            <div className="matching-page-card">
                                {tempCompanyData && tempCompanyData[currentCompanyIndex] ? (
                                    <div align="left">
                                        <h1>Company: {tempCompanyData[currentCompanyIndex].Name}</h1>
                                        <h2>Location: {tempCompanyData[currentCompanyIndex].Loc}</h2>
                                        <h3>Working Model: {tempCompanyData[currentCompanyIndex].Type}</h3>
                                        <h3>Bio: {tempCompanyData[currentCompanyIndex].Bio}</h3>
                                        <h3>Technologies: {tempCompanyData[currentCompanyIndex].Tech.map((tech, index) => (
                                          <span key={index}>
                                            {index > 0 && ", "}
                                            {tech}
                                          </span>
                                        ))}</h3>
                                        <h3>Contact: {tempCompanyData[currentCompanyIndex].ContactName}</h3>
                                        <h3>Email: {tempCompanyData[currentCompanyIndex].ContactEmail}</h3>
                                    </div>
                                ) : (
                                    <h1>Company Limit eached</h1>
                                )}
                            </div>
                            <ButtonGroup variant="contained">
                                <Button onClick={tempCompanyData[currentCompanyIndex] && handleCurrentCompanyIndexChange} startIcon={<ThumbDownIcon />}></Button>
                                <Button onClick={tempCompanyData[currentCompanyIndex] && handleCompanyLike} startIcon={<ThumbUpIcon />} ></Button>
                            </ButtonGroup>
                        </Container>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default MatchingPage;
