// // src/components/FileUpload.jsx
// import React, { useState } from "react";

// export default function FileUpload({ onSubmit, status }) {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert("Please select a file before uploading!");
//       return;
//     }
//     onSubmit(file);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col items-center space-y-4"
//     >
//       <input
//         type="file"
//         accept=".mp3,.mp4,.wav,.m4a,.mov,.avi" // common audio/video formats
//         onChange={handleFileChange}
//         className="block w-full text-sm text-gray-500 
//                    file:mr-4 file:py-2 file:px-4 
//                    file:rounded-lg file:border-0 
//                    file:text-sm file:font-semibold 
//                    file:bg-indigo-50 file:text-indigo-700 
//                    hover:file:bg-indigo-100"
//       />

//       <button
//         type="submit"
//         disabled={status === "processing"}
//         className={`px-6 py-2 rounded-lg font-semibold text-white ${
//           status === "processing"
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-indigo-600 hover:bg-indigo-700"
//         }`}
//       >
//         {status === "processing" ? "Processing..." : "Upload & Summarize"}
//       </button>
//     </form>
//   );
// }

import React, { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const [targetLang, setTargetLang] = useState("es"); // default Spanish
  const [translations, setTranslations] = useState({
    transcript: "",
    summary: "",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError("");
    setTranslations({ transcript: "", summary: "" });
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5000/api/summarize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process file");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to process file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Translation
  const handleTranslate = async () => {
    if (!result) return;

    try {
      const transcriptRes = await fetch("http://localhost:5000/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: result.transcript,
          targetLang,
        }),
      });

      const summaryRes = await fetch("http://localhost:5000/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: result.summary,
          targetLang,
        }),
      });

      const transcriptData = await transcriptRes.json();
      const summaryData = await summaryRes.json();

      setTranslations({
        transcript: transcriptData.translatedText || "",
        summary: summaryData.translatedText || "",
      });
    } catch (err) {
      console.error(err);
      setError("❌ Translation failed.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        fontFamily: "Segoe UI, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "10px", color: "#333" }}>
          🎙️ Zoom Call Summarizer
        </h1>
        <p style={{ textAlign: "center", marginBottom: "20px", color: "#555" }}>
          Upload your audio or video file to generate a transcript and summary.
        </p>

        {/* File Upload */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <input
            type="file"
            onChange={handleFileChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Upload Button */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={handleUpload}
            disabled={loading}
            style={{
              background: loading ? "#999" : "#4facfe",
              color: "white",
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              transition: "0.3s",
            }}
          >
            {loading ? "⏳ Processing..." : "Upload & Summarize"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "15px" }}>
            {error}
          </p>
        )}

        {/* Results */}
        {result && (
          <div style={{ marginTop: "30px" }}>
            <h2 style={{ color: "#333" }}>📝 Transcript (English)</h2>
            <div
              style={{
                background: "#f9f9f9",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                maxHeight: "150px",
                overflowY: "auto",
                marginBottom: "20px",
              }}
            >
              <p>{result.transcript || "No transcript available."}</p>
            </div>

            <h2 style={{ color: "#333" }}>📌 Summary (English)</h2>
            <div
              style={{
                background: "#f9f9f9",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                maxHeight: "150px",
                overflowY: "auto",
              }}
            >
              <p>{result.summary || "No summary available."}</p>
            </div>

            {/* Translation Section */}
            <div style={{ marginTop: "30px" }}>
              <h2 style={{ color: "#333" }}>🌍 Translate</h2>
              <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    flex: 1,
                  }}
                >
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="hi">Hindi</option>
                  <option value="zh-cn">Chinese (Simplified)</option>
                  <option value="ja">Japanese</option>
                </select>

                <button
                  onClick={handleTranslate}
                  style={{
                    background: "#00c853",
                    color: "white",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Translate
                </button>
              </div>

              {/* Show Translations */}
              {translations.transcript && (
                <>
                  <h3 style={{ color: "#333" }}>
                    📝 Transcript ({targetLang.toUpperCase()})
                  </h3>
                  <div
                    style={{
                      background: "#eef9f1",
                      padding: "15px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      maxHeight: "150px",
                      overflowY: "auto",
                      marginBottom: "20px",
                    }}
                  >
                    <p>{translations.transcript}</p>
                  </div>

                  <h3 style={{ color: "#333" }}>
                    📌 Summary ({targetLang.toUpperCase()})
                  </h3>
                  <div
                    style={{
                      background: "#eef9f1",
                      padding: "15px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      maxHeight: "150px",
                      overflowY: "auto",
                    }}
                  >
                    <p>{translations.summary}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
