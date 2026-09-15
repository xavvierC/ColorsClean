import * as React from 'react';

export type InteractiveHoverButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export const InteractiveHoverButton = React.forwardRef<HTMLButtonElement, InteractiveHoverButtonProps>(
  ({ text, className = '', disabled, ...props }, ref) => (
    <button ref={ref} className={`interactive-hover-button ${className}`} disabled={disabled} {...props}>
      <span className="interactive-hover-button__label">{text}</span>
      <span className="interactive-hover-button__hover" aria-hidden="true">{text} →</span>
    </button>
  )
);

InteractiveHoverButton.displayName = 'InteractiveHoverButton';
