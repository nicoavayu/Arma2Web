import { cn } from "@/lib/utils";

/** Eyebrow + display title (the accent gets the brand gradient) + optional lead, shared by the Torneos sections. */
export function SectionHead({
  id,
  eyebrow,
  title,
  accent,
  lead,
  align = "left",
  className,
}: {
  /** Id of the h2, for the section's aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.2em] text-[#b8a8ff]">{eyebrow}</p>
      <h2 id={id} className="disp-t text-[clamp(2.4rem,5vw,4.8rem)] text-white">
        {title}
        {accent && (
          <>
            {" "}
            <span className="text-grad-t">{accent}</span>
          </>
        )}
      </h2>
      {lead && <p className={cn("mt-4 text-base leading-relaxed text-white/70 md:text-lg", align === "center" && "mx-auto max-w-2xl")}>{lead}</p>}
    </header>
  );
}

/** Horizontal padding and max width every Torneos section shares. */
export const SECTION_PAD = "px-[clamp(20px,6vw,104px)]";
