import React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
    hoverEffect?: boolean;
    spotlight?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, hoverEffect = false, spotlight = true, children, ...props }, ref) => {
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        const springConfig = { damping: 20, stiffness: 300 };
        const spotlightX = useSpring(mouseX, springConfig);
        const spotlightY = useSpring(mouseY, springConfig);

        // Tilt effect
        const rotateX = useSpring(0, springConfig);
        const rotateY = useSpring(0, springConfig);

        function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
            const { left, top, width, height } = currentTarget.getBoundingClientRect();
            const x = clientX - left;
            const y = clientY - top;

            mouseX.set(x);
            mouseY.set(y);

            // Calculate tilt
            const rX = ((y / height) - 0.5) * -10; // Max 5deg tilt
            const rY = ((x / width) - 0.5) * 10;
            rotateX.set(rX);
            rotateY.set(rY);
        }

        function handleMouseLeave() {
            rotateX.set(0);
            rotateY.set(0);
        }

        return (
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                }}
                className={cn(
                    "premium-card group relative overflow-hidden rounded-2xl p-6 backdrop-blur-md transition-all duration-300",
                    hoverEffect && "hover:border-primary/45 hover:bg-surface-highlight/70 hover:shadow-2xl hover:shadow-primary/10",
                    className
                )}
                {...props}
            >
                {spotlight && (
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: `radial-gradient(350px circle at ${spotlightX}px ${spotlightY}px, rgba(39, 184, 255, 0.2), rgba(236, 77, 255, 0.12), transparent 78%)`,
                        }}
                    />
                )}
                <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                    {children as React.ReactNode}
                </div>
            </motion.div>
        );
    }
);

Card.displayName = "Card";
