import React, { useState } from 'react';

export default function FileUpload({ onSubmit, status }) {
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            onSubmit(file);
        }
    };

    const isBusy = status === 'processing';

    const getButtonText = () => {
        switch (status) {
            case 'processing':
                return 'Analyzing... Please wait.';
            case 'done':
                return 'Notes Generated!';
            default:
                return 'Upload & Summarize';
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept="audio/,video/"
                className="block w-full text-sm text-gray-600 
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-indigo-50 file:text-indigo-700
                   hover:file:bg-indigo-100"
            />

            {isBusy && (
                <div className="mt-4 text-center text-sm font-medium text-indigo-600">
                    {getButtonText()}
                </div>
            )}

            <button
                type="submit"
                disabled={!file || isBusy}
                className={`mt-6 w-full py-3 rounded-lg font-bold transition duration-200 shadow-md
          ${!file || isBusy
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'}`
                }
            >
                {isBusy ? 'Processing...' : 'Upload & Summarize'}
            </button>

        </form>
    );
}