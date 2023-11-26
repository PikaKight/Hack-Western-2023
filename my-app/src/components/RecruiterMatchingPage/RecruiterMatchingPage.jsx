import "./RecruiterMatchingPage.css";
import { useState, useEffect } from "react";

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
      <ReactQuill
        theme="snow" 
        value={codeSnippet}
      />
    </div>
  )
}

export default RecruiterMatchingPage;