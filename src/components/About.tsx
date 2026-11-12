import { about, facts, skills } from "@/data/profile";
import Section from "./Section";
import Reveal from "./Reveal";

export default function About() {
  return (
    <Section id="about" index="03" title="About" tone="white">
      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-7">
          {about.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <p className={i === 0 ? "t-lead !text-ink" : "t-body mt-5"}>{p}</p>
            </Reveal>
          ))}
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 self-start md:col-span-4 md:col-start-9">
          {facts.map((f) => (
            <Reveal key={f.label}>
              <dt className="t-small">{f.label}</dt>
              <dd className="mt-1 text-[17px] font-medium tracking-[-0.01em]">{f.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="mt-20">
        <Reveal>
          <h3 className="t-h3">Skills</h3>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 50} className="rounded-2xl bg-paper p-6">
              <h4 className="text-[15px] font-semibold">{g.group}</h4>
              <ul className="mt-3 space-y-1.5">
                {g.items.map((s) => (
                  <li key={s} className="text-[15px] text-ink-2">
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
