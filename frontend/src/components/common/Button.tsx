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
    "relative font-sans font-semibold tracking-wider uppercase text-sm transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group shadow-elevation-1 hover:shadow-elevation-2 rounded-lg";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-luxury-darkGold to-luxury-gold text-white hover:from-luxury-gold hover:to-luxury-darkGold hover:shadow-luxury-lg focus:ring-luxury-gold border border-luxury-darkGold hover:border-luxury-gold",
    secondary:
      "bg-white text-luxury-taupe hover:bg-gradient-to-r hover:from-luxury-champagne hover:to-luxury-pearl focus:ring-luxury-gold border border-luxury-gold/30 hover:border-luxury-gold hover:text-luxury-darkGold font-bold",
    danger:
      "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-500 border border-red-600 shadow-lg hover:shadow-xl",
    ghost:
      "bg-transparent text-luxury-taupe hover:bg-luxury-champagne/50 focus:ring-luxury-gold border border-luxury-gold/20 hover:border-luxury-gold hover:text-luxury-darkGold font-semibold",
  };

  const sizeClasses = {
    small: "px-4 py-2 text-xs",
    medium: "px-6 py-3.5 text-sm",
    large: "px-8 py-4 text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

      <span className="relative z-10">
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
      </span>
    </button>
  );
};
