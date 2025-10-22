import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  children: React.ReactNode;
}

/**
 * Reusable Button component with multiple variants
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-sans font-medium tracking-wide uppercase text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-luxury-charcoal text-white hover:bg-luxury-gold hover:text-luxury-charcoal focus:ring-luxury-gold border border-luxury-charcoal hover:border-luxury-gold",
    secondary:
      "bg-white text-luxury-charcoal hover:bg-luxury-champagne focus:ring-luxury-gold border border-gray-200",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-red-600",
    ghost:
      "bg-transparent text-luxury-charcoal hover:bg-luxury-champagne focus:ring-luxury-gold border border-transparent",
  };

  const sizeClasses = {
    small: "px-4 py-2 text-xs",
    medium: "px-6 py-3 text-sm",
    large: "px-8 py-4 text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
