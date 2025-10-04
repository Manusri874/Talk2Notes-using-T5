// // src/components/ResultCard.jsx
// import React from "react";

// export default function ResultCard({ title, text }) {
//   return (
//     <div className="p-5 border rounded-lg shadow-md bg-gray-50">
//       <h3 className="text-lg font-semibold text-indigo-700 mb-2">{title}</h3>
//       <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
//         {text}
//       </pre>
//     </div>
//   );
// }


import React from "react";

export default function ResultCard({ title, text }) {
  return (
    <div className="p-4 border rounded-lg shadow bg-gray-50">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <pre className="whitespace-pre-wrap text-gray-700">{text}</pre>
    </div>
  );
}
