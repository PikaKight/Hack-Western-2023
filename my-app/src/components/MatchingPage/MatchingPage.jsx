import "./MatchingPage.css";

import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import NavigationBar from "../Common/NavigationBar/NavigationBar";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MatchingPage = () => {
    const [companyBio, setBio] = useState([]);
    const [companyRecruiterEmail, setEmail] = useState([]);
    const [companyRecruiterName, setName] = useState([]);
    const [companyLocation, setLocation] = useState([]);
    const [companyName, setCompanyName] = useState([]);
    const [companyType, setCompanyType] = useState([]);

    const [codeSnippet, setCodeSnippet] = useState('');

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
                const response = await fetch("http://127.0.0.1:5050/getCompany");
                const data = await response.json();
                setBio(data.companyBio);
                setEmail(data.companyRecruiterEmail);
                setName(data.companyRecruiterName);
                setLocation(data.companyLocation);
                setCompanyName(data.companyName);
                setCompanyType(data.companyType);

            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <NavigationBar />
            <ReactQuill
                theme="snow" 
                value={codeSnippet}
                onChange={(content) => setCodeSnippet(content)}
            />
        </div>
    );
};

export default MatchingPage;
