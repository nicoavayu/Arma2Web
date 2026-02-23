import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    id?: string;
    className?: string;
    children: React.ReactNode;
}

export function Section({ id, className, children, ...props }: SectionProps) {
    return (
        <section
            id={id}
            className={cn("py-20 md:py-32 relative", className)}
            {...props}
        >
            {children}
        </section>
    );
}
