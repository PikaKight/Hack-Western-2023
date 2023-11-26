import "./RecruiterMatchingPage.css";
import { useState, useEffect } from "react";
import NavigationBar from "../Common/NavigationBar/NavigationBar";
import CodeSnippetTags from "../CodeSnippetTags/CodeSnippetTags";

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
  }, [])

  const handleUserCodeSnippetLike = () => {
    setIsUserCodeSnippetLiked(true);
  }

  return (
    <div>
      <NavigationBar />
      {isUserCodeSnippetLiked ? (
        <div>
          <h1>User profile feedback has been given!</h1>
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
        <h2>Tags</h2>
        <div className="recruiter-matching-page-tags">
          <div>
            <h4>Programming Languages:</h4>
            {selectedProgrammingLanguageOptions.map((obj, index) => (
              <p>{obj.label}</p>
            ))}
          </div>
          <div>
            <h4>Problem Type:</h4>
            {selectedProblemTypeOptions.map((obj, index) => (
              <p>{obj.label}</p>
            ))}
          </div>
          <div>
            <h4>Project Type:</h4>
            {selectedProjectTypeOptions.map((obj, index) => (
              <p>{obj.label}</p>
            ))}
          </div>
          <div>
            <h4>Databases:</h4>
            {selectedDatabaseOptions.map((obj, index) => (
              <p>{obj.label}</p>
            ))}
          </div>
          <div>
            <h4>Industry Targets:</h4>
            {selectedIndustryTargetOptions.map((obj, index) => (
              <p>{obj.label}</p>
            ))}
          </div>
        </div>
        <div className="recruiter-matching-page-buttons">
          <button onClick={handleUserCodeSnippetLike}>Like</button>
          <button>Dislike</button>
        </div>
      </div>
        </div>
      )}
    </div>
  )
}

export default RecruiterMatchingPage;