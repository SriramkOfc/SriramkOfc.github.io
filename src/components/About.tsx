import { about, facts, skills } from "@/data/profile";
import Section from "./Section";
import Reveal from "./Reveal";

export default function About() {
  return (
    <Section id="about" index="03" label="About">
      <div className="grid grid-cols-9 gap-x-6">
        <div className="col-span-9 lg:col-span-6">
          {about.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <p
                className={
                  i === 0
                    ? "text-pretty text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.3] tracking-[-0.02em]"
                    : "mt-6 text-pretty text-lg leading-[1.6] text-ink-2"
                }
              >
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        <dl className="col-span-9 mt-12 grid grid-cols-2 gap-x-6 gap-y-6 self-start lg:col-span-3 lg:col-start-7 lg:mt-1.5 lg:grid-cols-1">
          {facts.map((f) => (
            <Reveal key={f.label}>
              <dt className="meta">{f.label}</dt>
              <dd className="mt-1 text-[15px]">{f.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="mt-20">
        <Reveal className="meta mb-4">Skills</Reveal>
        <div className="grid gap-x-6 border-t border-rule sm:grid-cols-2 lg:grid-cols-5">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 50} className="border-b border-rule py-6 lg:border-b-0">
              <h3 className="text-[15px] font-medium">{g.group}</h3>
              <ul className="mt-3 space-y-1">
                {g.items.map((s) => (
                  <li key={s} className="text-[15px] text-grey">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
