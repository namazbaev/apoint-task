import React, { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'border';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon,
      className = '',
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center gap-2.5 font-medium rounded-lg transition-all duration-200 focus:outline-none';

    const sizeClasses = {
      sm: 'px-3.5 py-2 text-sm',
      md: 'px-4 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    const variantClasses = {
      primary: disabled
        ? 'bg-neutral-100 text-neutral-300 cursor-not-allowed'
        : 'bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      secondary: disabled
        ? 'bg-neutral-100 text-neutral-300 cursor-not-allowed'
        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2',
      border: disabled
        ? 'bg-white text-neutral-300 border border-neutral-200 cursor-not-allowed'
        : 'bg-white text-neutral-600 border border-neutral-500 hover:border-neutral-600 focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2',
    };

    const buttonClass = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

    return (
      <button ref={ref} className={buttonClass} disabled={disabled} {...props}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
