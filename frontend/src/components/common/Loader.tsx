import React from "react";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  text?: string;
}

/**
 * Loading spinner component
 */
export const Loader: React.FC<LoaderProps> = ({ size = "medium", text }) => {
  const sizeClasses = {
    small: "h-8 w-8",
    medium: "h-12 w-12",
    large: "h-16 w-16",
  };

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 border-luxury-champagne rounded-full`}
        ></div>
        <div
          className={`${sizeClasses[size]} border-4 border-luxury-gold rounded-full animate-spin absolute top-0 left-0 border-t-transparent border-r-transparent`}
        ></div>
      </div>
      {text && (
        <p className="mt-6 text-gray-500 text-sm tracking-wide uppercase">
          {text}
        </p>
      )}
    </div>
  );
};
