import React, { useState } from 'react';

interface ResultCardProps {
  caption: string;
  index: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ caption, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500" />
      
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
             ⚡️
           </div>
           <span className="text-sm font-semibold text-gray-500">Option {index + 1}</span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-all duration-300 ${
            copied 
              ? 'bg-green-500 text-white scale-105' 
              : 'bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700'
          }`}
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      
      <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-800 font-medium">
        {caption}
      </p>
    </div>
  );
};

export default ResultCard;