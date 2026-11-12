import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Every section uses this frame so headings and spacing are identical:
 *   number + H2 on the left, optional intro on the right, then content 64px below.
 */
export default function Section({
  id,
  index,
  title,
  intro,
  tone = "paper",
  children,
}: {
  id: string;
  index: string;
  title: string;
  intro?: string;
  tone?: "paper" | "white";
  children: ReactNode;
}) {
  return (
    <section id={id} className={tone === "white" ? "bg-white" : ""}>
      <div className="mx-auto max-w-[1200px] px-5 py-[88px] sm:px-8 md:py-32">
        <header className="mb-10 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <span className="t-small block font-medium text-accent">{index}</span>
            <h2 className="t-h2 mt-3">{title}</h2>
          </Reveal>
          {intro && (
            <Reveal delay={80} className="t-lead md:col-span-5 md:pb-1">
              {intro}
            </Reveal>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
