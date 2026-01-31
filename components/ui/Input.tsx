import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
    error?: boolean;
    leftIcon?: React.ReactNode;
    variant?: 'default' | 'terminal' | 'vineyard' | 'studio';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, helperText, error, leftIcon, variant = 'default', ...props }, ref) => {

        // Variant styles
        const variants = {
            default: "bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-white/30 focus:ring-0",
            terminal: "bg-transparent border-b border-gray-700 rounded-none text-term-text font-mono placeholder:text-gray-700 focus:border-term-accent px-0",
            vineyard: "bg-white/5 border border-border-dark rounded-sm text-dash-text-main font-sans text-sm focus:border-dash-primary",
            studio: "bg-[#111] border border-[#333] rounded-md text-white font-mono text-sm focus:border-studio-accent"
        };

        const variantClass = variants[variant] || variants.default;

        return (
            <div className="w-full">
                {label && (
                    <label className={`block mb-1.5 text-xs font-medium uppercase tracking-wider ${variant === 'terminal' ? 'text-term-accent font-mono' : 'text-gray-400'
                        }`}>
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`w-full py-2.5 outline-none transition-colors ${leftIcon ? 'pl-10' : 'pl-3'
                            } pr-3 ${variantClass} ${error ? 'border-red-500' : ''} ${className}`}
                        {...props}
                    />
                </div>
                {helperText && (
                    <p className={`mt-1 text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}>
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
