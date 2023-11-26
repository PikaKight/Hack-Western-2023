import "./MatchingPage.css";

import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import NavigationBar from "../Common/NavigationBar/NavigationBar";

const MatchingPage = () => {
    const [companyBio, setBio] = useState([]);
    const [companyRecruiterEmail, setEmail] = useState([]);
    const [companyRecruiterName, setName] = useState([]);
    const [companyLocation, setLocation] = useState([]);
    const [companyName, setCompanyName] = useState([]);
    const [companyType, setCompanyType] = useState([]);

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
            <div>
                <Typography variant="h1">Matching</Typography>
                <Typography variant="h2">{companyName}</Typography>
            </div>
            <button className="buttonLike">Like</button>
            <button className="buttonDislike">Dislike</button>
        </div>
    );
};

export default MatchingPage;
