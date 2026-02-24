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
            className={cn("relative py-16 [@media(max-width:430px)]:py-14 [@media(max-width:360px)]:py-12 md:py-24 lg:py-32", className)}
            {...props}
        >
            {children}
        </section>
    );
}
