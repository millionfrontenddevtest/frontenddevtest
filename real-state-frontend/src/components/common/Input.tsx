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
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-gray-600 mb-2 tracking-wide uppercase"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-4 py-3 border bg-white
          focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold
          disabled:bg-gray-50 disabled:cursor-not-allowed
          transition-all duration-200
          ${error ? "border-red-500" : "border-gray-200"}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-2 text-xs text-gray-400">{helperText}</p>
      )}
    </div>
  );
};
