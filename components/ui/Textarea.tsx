import React, { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    helperText?: string;
    error?: boolean;
    variant?: 'default' | 'terminal' | 'studio';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = '', label, helperText, error, variant = 'default', ...props }, ref) => {

        const variants = {
            default: "bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-white/30",
            terminal: "bg-transparent border border-gray-700 rounded-none text-term-text font-mono placeholder:text-gray-800 focus:border-term-accent",
            studio: "bg-[#0a0a0a] border border-border-dark rounded-none text-gray-300 font-mono text-xs focus:border-white focus:ring-1 focus:ring-white"
        };

        const variantClass = variants[variant] || variants.default;

        return (
            <div className="w-full">
                {label && (
                    <label className={`block mb-2 text-xs font-mono uppercase ${variant === 'terminal' ? 'text-term-accent' : 'text-text-secondary'}`}>
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={`w-full p-3 outline-none transition-all resize-none ${variantClass} ${error ? 'border-red-500' : ''} ${className}`}
                    {...props}
                />
                {helperText && (
                    <p className={`mt-1 text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}>
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export { Textarea };
