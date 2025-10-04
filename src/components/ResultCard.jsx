import React from 'react';

export default function ResultCard({ title, text }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2 border-b pb-1">
                {title}
            </h3>
            {/* whitespace-pre-line preserves line breaks from the .join('\n') in App.jsx */}
            <p className="text-gray-700 whitespace-pre-line">
                {text}
            </p>
        </div>
    );
}