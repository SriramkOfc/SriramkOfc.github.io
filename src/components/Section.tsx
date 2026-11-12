import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Shared section frame: index + label in cols 1–3, content in cols 4–12. */
export default function Section({
  id,
  index,
  label,
  children,
}: {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-[1200px] px-5 sm:px-8">
      <div className="grid grid-cols-12 gap-x-6 border-t border-rule pb-24 pt-6 md:pb-36">
        <Reveal className="col-span-12 mb-10 flex gap-6 md:col-span-3 md:mb-0">
          <span className="meta">{index}</span>
          <span className="meta !text-ink">{label}</span>
        </Reveal>
        <div className="col-span-12 md:col-span-9">{children}</div>
      </div>
    </section>
  );
}
