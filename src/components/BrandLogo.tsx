import React from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 32,
  className = '',
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className="relative flex items-center justify-center rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs ring-1 ring-black/5 dark:ring-white/10 shrink-0 transition-transform hover:scale-105"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 32 32"
          width={size * 0.68}
          height={size * 0.68}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Geometric precision NB monogram */}
          {/* N leg left */}
          <path
            d="M6 24V8h3l6 10V8h3v16h-3L9 14v10H6Z"
            fill="currentColor"
          />
          {/* B spine and dual bowls */}
          <path
            d="M19 8h5.5a3.5 3.5 0 0 1 3 1.7 3.5 3.5 0 0 1-.5 4.3 4 4 0 0 1 1 2.8c0 2.3-1.8 4.2-4 4.2H19V8Zm3 3v3.5h2.2a1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.9H22Zm0 6.5V21h2.5a1.8 1.8 0 0 0 1.8-1.7 1.8 1.8 0 0 0-1.8-1.8H22Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-semibold text-sm tracking-tight text-neutral-900 dark:text-white leading-tight">
            nbsumit
          </span>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-normal leading-none mt-0.5">
            Sumit Sengar
          </span>
        </div>
      )}
    </div>
  );
};
