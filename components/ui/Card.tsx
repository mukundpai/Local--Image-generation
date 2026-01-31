import React, { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass' | 'terminal' | 'vintage' | 'studio';
    hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', variant = 'default', hover = false, children, ...props }, ref) => {

        // Variant styles
        const variants = {
            default: "bg-card-dark border border-border-hover",
            glass: "bg-white/5 backdrop-blur-md border border-white/10",
            terminal: "bg-black border border-term-border shadow-glow",
            vintage: "bg-dash-card border border-dash-border shadow-vintage",
            studio: "bg-studio-panel border border-studio-border"
        };

        const hoverStyle = hover ? "hover:border-opacity-100 transition-colors duration-200" : "";

        return (
            <div
                ref={ref}
                className={`${variants[variant]} ${hoverStyle} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

export { Card };
