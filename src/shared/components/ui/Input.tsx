import React, { forwardRef, useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      showPasswordToggle = false,
      type = 'text',
      className = '',
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = showPasswordToggle && showPassword ? 'text' : type;

    const inputClass = `
    text-sm w-full px-4 py-3 pr-12 rounded-lg border transition-all duration-200 
    placeholder:text-neutral-400 focus:outline-none
    ${
      error
        ? 'border-red-500 bg-red-50 text-red-900 focus:ring-2 focus:ring-red-100'
        : 'border-neutral-300 bg-neutral-0 text-neutral-700 hover:border-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-300 focus:bg-white'
    }
    ${className}
  `.trim();

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-900 mb-1.5">
            {label}
          </label>
        )}

        <div className="relative">
          <input ref={ref} type={inputType} className={inputClass} {...props} />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {error && <AlertCircle className="size-5 text-red-500" />}

            {showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            )}
          </div>
        </div>

        {(hint || error) && (
          <div className="flex items-center gap-2 mt-2">
            <AlertCircle className="w-4 h-4 text-neutral-400" />
            <p
              className={`text-sm ${error ? 'text-red-500' : 'text-neutral-500'}`}
            >
              {error || hint}
            </p>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
