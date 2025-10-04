// import React, { useState } from 'react';
// import FileUpload from './components/FileUpload';
// import ResultCard from './components/ResultCard';

// // App.jsx (inside handleUploadSubmit)

// const handleUploadSubmit = async (file) => {
//     try {
//         setErrorMsg('');
//         setStatus('processing');
//         setResult(null);

//         // 1. Prepare the data for upload (FormData is necessary for files)
//         const formData = new FormData();
//         formData.append('file', file); // 'file' should match the name your backend expects

//         // 2. Send the file to your backend API
//         const response = await fetch('YOUR_BACKEND_API_ENDPOINT_HERE', { // <-- UPDATE THIS URL!
//             method: 'POST',
//             body: formData,
//             // Credentials might be needed if you use sessions/cookies, but often not necessary for simple APIs
//             // credentials: 'include', 
//         });

//         // 3. Check for HTTP errors (like 404 or 500)
//         if (!response.ok) {
//             // Throw an error if the server response is not successful
//             throw new Error(Server error: `${response.status} ${response.statusText}`);
//         }

//         // 4. Parse the successful JSON result
//         const realResult = await response.json();

//         // 5. Update state with the real data
//         setResult(realResult);
//         setStatus('done');

//     } catch (error) {
//         console.error("Upload Error:", error);
//         setErrorMsg("Failed to process the file. Check your server connection and CORS settings.");
//         setStatus('error');
//     }
// };

// // ... rest of App.jsx

// export default function App() {
//     const [status, setStatus] = useState('idle'); // 'idle' | 'processing' | 'done' | 'error'
//     const [result, setResult] = useState(null);
//     const [errorMsg, setErrorMsg] = useState('');

//     // Simple submission handler for stable testing
//     const handleUploadSubmit = async (file) => {
//         try {
//             setErrorMsg('');
//             setStatus('processing');
//             setResult(null);

//             // Simulate API processing delay (3 seconds)
//             await new Promise(resolve => setTimeout(resolve, 3000));

//             // Set successful mock result
//             setResult(MOCK_RESULT);
//             setStatus('done');

//         } catch (error) {
//             console.error("Upload Error:", error);
//             setErrorMsg("Failed to process the file.");
//             setStatus('error');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//             <div className="w-full max-w-3xl bg-white p-8 shadow-2xl rounded-xl border border-gray-100">

//                 <h1 className="text-3xl font-bold text-indigo-700 text-center mb-2">
//                     Zoom Call Summarizer
//                 </h1>
//                 <p className="text-base text-gray-500 text-center mb-8">
//                     Upload your audio/video file to get quick notes.
//                 </p>

//                 {/* File Upload Component */}
//                 <FileUpload
//                     onSubmit={handleUploadSubmit}
//                     status={status}
//                 />

//                 {/* Display Error Message */}
//                 {status === "error" && errorMsg && (
//                     <div className="mt-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center font-medium">
//                         Error: {errorMsg}
//                     </div>
//                 )}

//                 {/* Display Results */}
//                 {status === "done" && result && (
//                     <div className="mt-8 space-y-5">
//                         <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Generated Notes</h2>

//                         <ResultCard title="Transcript" text={result.transcript} />
//                         <ResultCard title="Summary" text={result.summary} />

//                         <ResultCard
//                             title="Action Items"
//                             text={
//                                 result.action_items
//                                     // CORRECTED: Uses a template literal to format numbered list items
//                                     ?.map((item, index) => ` ${index + 1}. ${item}`)
//                                     .join('\n')
//                             }
//                         />

//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// }




import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import FileUpload from "./FileUpload";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>⏳ Loading...</p>;
  }

  return (
    <Router>
      {/* Navbar */}
      <nav
        style={{
          padding: "15px 30px",
          background: "#1f2937", // Tailwind gray-800
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ fontSize: "18px", fontWeight: "bold", color: "white", textDecoration: "none" }}>
          🎙️ Zoom Call Summarizer
        </Link>

        <div>
          {!user ? (
            <>
              <Link
                to="/login"
                style={{ marginRight: "20px", textDecoration: "none", color: "white" }}
              >
                Login
              </Link>
              <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444", // Tailwind red-500
                padding: "8px 14px",
                borderRadius: "6px",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Routes */}
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <FileUpload /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
