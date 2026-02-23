import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "accent" | "ghost" | "outline";
    size?: "sm" | "md" | "lg" | "xl";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            isLoading,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const variants = {
            primary:
                "bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:bg-blue-600 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] border border-blue-500/50",
            secondary:
                "bg-surface-highlight text-white border border-white/10 hover:bg-white/10 hover:border-white/20",
            accent:
                "bg-accent text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:bg-violet-600 border border-violet-500/50",
            ghost:
                "bg-transparent text-text-secondary hover:text-white hover:bg-white/5",
            outline:
                "bg-transparent border border-primary/50 text-primary hover:bg-primary/10",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 text-sm",
            lg: "h-12 px-6 text-base",
            xl: "h-14 px-8 text-lg",
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    "relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = "Button";
