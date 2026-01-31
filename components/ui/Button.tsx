import React, { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'terminal' | 'vintage' | 'studio' | 'gallery';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {

        // Base styles
        let baseStyles = "inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";

        // Variant styles
        const variants: Record<ButtonVariant, string> = {
            primary: "bg-white text-black hover:bg-gray-200 font-medium rounded-lg shadow-sm border border-transparent",
            secondary: "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/40",
            ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",

            // Theme specific
            terminal: "bg-term-accent text-black border-2 border-transparent hover:bg-term-bright font-mono uppercase tracking-widest font-bold rounded-none",
            vintage: "bg-transparent border border-dash-dim text-dash-dim hover:text-dash-primary hover:border-dash-primary font-sans uppercase tracking-[0.2em] text-[10px] font-bold rounded-sm",
            studio: "bg-studio-accent text-black font-mono font-bold uppercase tracking-wide hover:bg-[#c0c61b]",
            gallery: "bg-white text-black hover:bg-gray-200 font-sans font-light uppercase tracking-widest text-[10px] border border-transparent"
        };

        // Size styles
        const sizes: Record<ButtonSize, string> = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 text-sm",
            lg: "h-12 px-6 text-base",
            icon: "size-10 p-0"
        };

        const variantClasses = variants[variant];
        const sizeClasses = sizes[size];

        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={`${baseStyles} ${variantClasses} ${sizeClasses} ${className}`}
                {...props}
            >
                {isLoading && (
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                )}
                {!isLoading && leftIcon && <span className="mr-2 flex shrink-0 items-center">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && <span className="ml-2 flex shrink-0 items-center">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
