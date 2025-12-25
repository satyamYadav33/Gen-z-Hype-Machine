import React from 'react';

interface InputGroupProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isTextArea?: boolean;
  hasError?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  isTextArea = false,
  hasError = false,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className={`text-sm font-bold uppercase tracking-wider ${hasError ? 'text-red-300' : 'text-indigo-100'}`}>
          {label}
        </label>
        {hasError && (
          <span className="text-xs text-red-300 font-semibold animate-pulse">Required</span>
        )}
      </div>
      
      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border-2 p-4 text-white placeholder-indigo-200/50 outline-none backdrop-blur-sm transition-all focus:bg-white/20 focus:ring-0 min-h-[100px] resize-none
            ${hasError 
              ? 'border-red-400/70 bg-red-500/10 focus:border-red-400' 
              : 'border-indigo-300/30 bg-white/10 focus:border-yellow-400'
            }`}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border-2 p-4 text-white placeholder-indigo-200/50 outline-none backdrop-blur-sm transition-all focus:bg-white/20 focus:ring-0
            ${hasError 
              ? 'border-red-400/70 bg-red-500/10 focus:border-red-400' 
              : 'border-indigo-300/30 bg-white/10 focus:border-yellow-400'
            }`}
        />
      )}
    </div>
  );
};

export default InputGroup;