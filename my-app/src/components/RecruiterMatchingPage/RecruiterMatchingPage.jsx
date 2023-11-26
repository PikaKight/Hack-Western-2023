import "./RecruiterMatchingPage.css";
import { useState, useEffect } from "react";
import NavigationBar from "../Common/NavigationBar/NavigationBar";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RecruiterMatchingPage = () => {
  const [codeSnippet, setCodeSnippet] = useState('');

  useEffect(() => {
    const savedCodeSnippet = localStorage.getItem("CODE_SNIPPET");
    if (savedCodeSnippet) {
      const parsedCodeSnippet = JSON.parse(savedCodeSnippet);
      setCodeSnippet(parsedCodeSnippet);
    }
  }, [])

  return (
    <div>
      <NavigationBar />
      <div className="recruiter-matching-page"> 
        <div className="recruiter-matching-page-editor">
          <ReactQuill
            theme="snow" 
            value={codeSnippet}
            readOnly={true}
          />
        </div>
        <p>Tags: </p>
        <div>
          <button>Like</button>
          <button>Dislike</button>
        </div>
      </div>
    </div>
  )
}

export default RecruiterMatchingPage;