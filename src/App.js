import React, { useState } from "react";

function App() {

  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const analyzeResume = async () => {

    if (!file) {
      alert("Please upload a resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {

      setLoading(true);

      const response = await fetch("https://ai-resume-analyzer-backend-ls0f.onrender.com/api/resume/analyze", {
        method: "POST",
        body: formData
      });

      console.log("Response received from backend");

      const data = await response.json();

      setAnalysis(data.analysis);

      setLoading(false);

    } catch (error) {

      console.error(error);
      alert("Server error. Make sure backend is running.");
      setLoading(false);

    }
  };

  return (
    <div className="container mt-5">

      <h1 className="text-center mb-4">AI Resume Analyzer</h1>

      <div className="card p-4 shadow">

        <input
          type="file"
          className="form-control mb-3"
          onChange={handleFileChange}
        />

        <button
          className="btn btn-primary"
          onClick={analyzeResume}
        >
          Analyze Resume
        </button>

        {loading && <p className="mt-3">Analyzing resume...</p>}

      </div>

      {analysis && (

        <div className="card p-4 shadow mt-4">

          <h3>ATS Score</h3>

          <div className="progress mb-3">

            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${analysis.atsScore}%` }}
            >
              {analysis.atsScore}%
            </div>

          </div>

          <h4>Matched Skills</h4>

          {analysis.matchedSkills.map((skill, index) => (

            <span key={index} className="badge bg-success m-1">
              {skill}
            </span>

          ))}

          <h4 className="mt-3">Missing Skills</h4>

          {analysis.missingSkills.map((skill, index) => (

            <span key={index} className="badge bg-danger m-1">
              {skill}
            </span>

          ))}

        </div>

      )}

    </div>
  );
}

export default App;