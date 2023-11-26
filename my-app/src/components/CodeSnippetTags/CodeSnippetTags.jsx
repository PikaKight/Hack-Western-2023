import "./CodeSnippetTags.css";

import React, { useEffect, useState } from 'react'
import Select from 'react-select'

const CodeSnippetTags = () => {
  const programmingLanguageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
    { value: 'typescript', label: 'TypeScript' },
  ];
  
  const problemTypeOptions = [
    { value: 'leetcode', label: 'LeetCode Challenge' },
    { value: 'hackerrank', label: 'HackerRank Problem' },
    { value: 'codesignal', label: 'CodeSignal Exercise' },
    { value: 'projectcode', label: 'Project Code' },
    { value: 'algorithm', label: 'Algorithm Implementation' },
  ];
  
  const projectTypeOptions = [
    { value: 'webdev', label: 'Web Development' },
    { value: 'mobileapp', label: 'Mobile App Development' },
    { value: 'datascience', label: 'Data Science' },
    { value: 'machinelearning', label: 'Machine Learning' },
    { value: 'gamedev', label: 'Game Development' },
    { value: 'automation', label: 'Automation Script' },
  ];
  
  const databaseOptions = [
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'sqlite', label: 'SQLite' },
    { value: 'firebase', label: 'Firebase' },
  ];
  
  const industryTargetOptions = [
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'education', label: 'Education' },
    { value: 'socialmedia', label: 'Social Media' },
    { value: 'iot', label: 'IoT (Internet of Things)' },
  ];
  
  const [selectedTags, setSelectedTags] = useState([[]]);
  
  const [selectedProgrammingLanguageOptions, setSelectedProgrammingLanguageOptions] = useState([]);
  const [selectedProblemTypeOptions, setSelectedProblemTypeOptions] = useState([]);
  const [selectedProjectTypeOptions, setSelectedProjectTypeOptions] = useState([]);
  const [selectedDatabaseOptions, setSelectedDatabaseOptions] = useState([]);
  const [selectedIndustryTargetOptions, setSelectedIndustryTargetOptions] = useState([]);
  
  useEffect(() => {
    const savedprogrammingLanguageOptions = localStorage.getItem("PROGRAMMING_LANGUAGE_OPTIONS");
    if (savedprogrammingLanguageOptions) {
      const parsedprogrammingLanguageOptions = JSON.parse(savedprogrammingLanguageOptions);
      setSelectedProgrammingLanguageOptions(parsedprogrammingLanguageOptions);
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
  }, [])

  const handleselectedProgrammingLanguageOptions = (event) => {
    setSelectedProgrammingLanguageOptions(event);
    localStorage.setItem("PROGRAMMING_LANGUAGE_OPTIONS", JSON.stringify(event));
  }

  const handleselectedProblemTypeOptions = (event) => {
    setSelectedProblemTypeOptions(event);
    localStorage.setItem("PROBLEM_TYPE_OPTIONS", JSON.stringify(event));
  }

  const handleselectedProjectTypeOptions = (event) => {
    setSelectedProjectTypeOptions(event);
    localStorage.setItem("PROJECT_TYPE_OPTIONS", JSON.stringify(event));
  }

  const handleselectedDatabaseOptions = (event) => {
    setSelectedDatabaseOptions(event);
    localStorage.setItem("DATABASE_OPTIONS", JSON.stringify(event));
  }

  const handleselectedIndustryTargetOptions = (event) => {
    setSelectedIndustryTargetOptions(event);
    localStorage.setItem("INDUSTRY_TARGET_OPTIONS", JSON.stringify(event));
  }

  

  return (
    <div className="code-snippet">
      <p>Programming language</p>
      <Select isMulti={true} options={programmingLanguageOptions} value={selectedProgrammingLanguageOptions} onChange={handleselectedProgrammingLanguageOptions} />
      <p>Problem type</p>
      <Select isMulti={true} options={problemTypeOptions} value={selectedProblemTypeOptions} onChange={handleselectedProblemTypeOptions} />
      <p>Project type</p>
      <Select isMulti={true} options={projectTypeOptions} value={selectedProjectTypeOptions} onChange={handleselectedProjectTypeOptions} />
      <p>Database</p>
      <Select isMulti={true} options={databaseOptions} value={selectedDatabaseOptions} onChange={handleselectedDatabaseOptions} />
      <p>Industry Target</p>
      <Select isMulti={true} options={industryTargetOptions} value={selectedIndustryTargetOptions} onChange={handleselectedIndustryTargetOptions} />
    </div>
  )
}

export default CodeSnippetTags;