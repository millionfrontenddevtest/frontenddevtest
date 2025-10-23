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
    ? "cursor-pointer transform hover:-translate-y-2 hover:shadow-elevation-3"
    : "";

  return (
    <div
      className={`
        relative bg-white shadow-elevation-1 overflow-hidden
        transition-all duration-500 ease-out
        border border-luxury-gold/10 rounded-lg
        backdrop-blur-sm
        ${hoverClasses}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-luxury-gold/5 pointer-events-none"></div>
      <div className="relative">{children}</div>
    </div>
  );
};
