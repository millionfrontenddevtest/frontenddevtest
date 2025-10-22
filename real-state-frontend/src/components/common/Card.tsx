import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

/**
 * Reusable Card component for content containers
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  hoverable = false,
}) => {
  const hoverClasses = hoverable
    ? "cursor-pointer transform hover:-translate-y-1 hover:shadow-luxury"
    : "";

  return (
    <div
      className={`
        bg-white shadow-subtle overflow-hidden
        transition-all duration-300 ease-out
        border border-gray-100
        ${hoverClasses}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
