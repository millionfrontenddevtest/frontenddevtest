import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Reusable Input component with label and error handling
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = "",
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full group">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-gray-700 mb-2.5 tracking-wider uppercase group-focus-within:text-luxury-gold transition-colors duration-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={`
            w-full px-4 py-3.5 border-2 bg-white/50 backdrop-blur-sm rounded-lg
            focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 focus:border-luxury-gold focus:bg-white
            disabled:bg-gray-50 disabled:cursor-not-allowed
            transition-all duration-300
            shadow-inner hover:shadow-md
            placeholder:text-gray-400 placeholder:font-light
            ${
              error
                ? "border-red-400 focus:ring-red-200"
                : "border-luxury-gold/20 hover:border-luxury-gold/40"
            }
            ${className}
          `}
          {...props}
        />
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-600 font-medium flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-xs text-gray-500 font-light">{helperText}</p>
      )}
    </div>
  );
};
