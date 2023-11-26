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

    useEffect(() => {
        const savedCodeSnippet = localStorage.getItem("CODE_SNIPPET");
        if (savedCodeSnippet) {
            const parsedCodeSnippet = JSON.parse(savedCodeSnippet);
            setCodeSnippet(parsedCodeSnippet);
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

    return (
        <div>
            <NavigationBar />
            <div>
                {companyData && companyData.map((companyObject, index) => (
                    <div>
                        <p>{companyObject.Name}</p>
                        <p>{companyObject.Location}</p>
                        <p>{companyObject.Type}</p>
                        <p>{companyObject.Bio}</p>
                        <p>{companyObject.ContactName}</p>
                        <p>{companyObject.ContactEmail}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchingPage;
