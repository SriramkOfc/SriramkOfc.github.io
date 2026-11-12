import { offguard, upcoming, profile } from "@/data/profile";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Work() {
  return (
    <Section id="work" index="01" label="Selected work">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-none tracking-[-0.045em]">
            {offguard.title}
          </h2>
          <span className="meta">
            {offguard.type}, {offguard.year}
          </span>
        </div>
        <p className="mt-6 max-w-[46ch] text-xl leading-[1.45] text-ink-2">{offguard.summary}</p>
      </Reveal>

      {/* How it works: three hairline columns */}
      <div className="mt-14 grid border-t border-rule sm:grid-cols-3">
        {offguard.steps.map((s, i) => (
          <Reveal
            key={s.k}
            delay={i * 80}
            className={`border-b border-rule py-7 sm:border-b-0 sm:py-8 ${i > 0 ? "sm:border-l sm:pl-6" : ""} ${
              i < 2 ? "sm:pr-6" : ""
            }`}
          >
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-medium tracking-[-0.02em]">{s.title}</span>
              <span className="meta">{s.k}</span>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-grey">{s.body}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="meta mt-6">Stack: {offguard.stack.join(", ")}</Reveal>

      {/* In progress */}
      <div className="mt-20">
        <Reveal className="meta mb-4">In progress</Reveal>
        <ul className="border-t border-rule">
          {upcoming.map((u, i) => (
            <Reveal as="li" key={u.title} delay={i * 60} className="grid grid-cols-12 gap-x-6 border-b border-rule py-5">
              <span className="col-span-12 text-[17px] leading-snug sm:col-span-8">{u.title}</span>
              <span className="meta col-span-6 mt-2 sm:col-span-2 sm:mt-0.5">{u.note}</span>
              <span className="meta col-span-6 mt-2 text-right sm:col-span-2 sm:mt-0.5">{u.status}</span>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-6 text-[15px]">
          Code and experiments on{" "}
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link">
            GitHub
          </a>
          .
        </Reveal>
      </div>
    </Section>
  );
}
