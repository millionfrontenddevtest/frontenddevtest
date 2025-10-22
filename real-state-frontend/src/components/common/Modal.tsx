import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
}

/**
 * Reusable Modal component with backdrop
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    small: "max-w-md",
    medium: "max-w-2xl",
    large: "max-w-4xl",
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-luxury-charcoal bg-opacity-80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`
          bg-white shadow-luxury w-full ${sizeClasses[size]}
          transform transition-all duration-300 ease-out
          max-h-[90vh] overflow-y-auto border border-gray-100
        `}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
            <h2 className="text-2xl font-serif font-semibold text-luxury-charcoal">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-luxury-gold transition-colors duration-200 p-2"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="px-8 py-6">{children}</div>
      </div>
    </div>
  );
};
