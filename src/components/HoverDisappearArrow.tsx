import React from 'react';
import { ArrowDown, ChevronDown, MoveDown } from 'lucide-react';

interface HoverDisappearArrowProps {
  variant?: 'arrow-down' | 'chevron-down' | 'move-down';
  size?: number;
  color?: string;
  className?: string;
  ariaLabel?: string;
}

const HoverDisappearArrow: React.FC<HoverDisappearArrowProps> = ({
  variant = 'arrow-down',
  size = 48,
  color = 'text-blue-500',
  className = '',
  ariaLabel = 'Scroll down indicator'
}) => {
  const IconComponent =
    variant === 'chevron-down' ? ChevronDown :
    variant === 'move-down' ? MoveDown :
    ArrowDown;

  return (
    <div
      className={`hover-disappear-arrow-container inline-flex items-center justify-center cursor-pointer ${className}`}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
        }
      }}
    >
      <IconComponent
        className={`hover-disappear-arrow ${color} transition-all duration-500 ease-in-out`}
        style={{ width: size, height: size }}
        strokeWidth={2}
        aria-hidden="true"
      />

      <style>{`
        .hover-disappear-arrow {
          opacity: 1;
          transform: scale(1) translateY(0);
          filter: blur(0px);
        }

        .hover-disappear-arrow-container:hover .hover-disappear-arrow {
          opacity: 0;
          transform: scale(0.8) translateY(-10px);
          filter: blur(4px);
        }

        .hover-disappear-arrow-container:focus .hover-disappear-arrow {
          opacity: 0;
          transform: scale(0.8) translateY(-10px);
          filter: blur(4px);
          outline: 2px solid currentColor;
          outline-offset: 4px;
        }

        .hover-disappear-arrow-container:focus {
          outline: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .hover-disappear-arrow {
            transition: opacity 0.2s ease-in-out;
          }

          .hover-disappear-arrow-container:hover .hover-disappear-arrow,
          .hover-disappear-arrow-container:focus .hover-disappear-arrow {
            transform: none;
            filter: none;
          }
        }
      `}</style>
    </div>
  );
};

export default HoverDisappearArrow;
