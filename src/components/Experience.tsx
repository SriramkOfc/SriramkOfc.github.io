import { experience, education, certifications } from "@/data/profile";
import Section from "./Section";
import Reveal from "./Reveal";

function Row({ left, title, sub, children }: { left: React.ReactNode; title: string; sub: string; children?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-x-6 border-b border-rule py-6">
      <div className="meta col-span-12 mb-2 sm:col-span-3 sm:mb-0 sm:pt-1">{left}</div>
      <div className="col-span-12 sm:col-span-9">
        <h3 className="text-[19px] font-medium leading-snug tracking-[-0.015em]">{title}</h3>
        <p className="mt-0.5 text-[15px] text-grey">{sub}</p>
        {children}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <Section id="experience" index="02" label="Experience">
      <Reveal>
        <h2 className="max-w-[18ch] text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.04em]">
          Engineering, QA, data and a lot of talking to customers.
        </h2>
      </Reveal>

      <div className="mt-14 border-t border-rule">
        {experience.map((r, i) => (
          <Reveal key={r.title + r.org} delay={i * 40}>
            <Row
              left={
                <>
                  {r.period}
                  {r.current && <span className="ml-2 text-accent">Current</span>}
                </>
              }
              title={`${r.title}, ${r.org}`}
              sub={`${r.summary} ${r.place}.`}
            >
              <ul className="mt-4 space-y-2">
                {r.points.map((p) => (
                  <li key={p} className="relative pl-4 text-[15px] leading-relaxed text-ink-2">
                    <span className="absolute left-0 top-[0.7em] h-px w-2 bg-ink-2" />
                    {p}
                  </li>
                ))}
              </ul>
            </Row>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 grid gap-x-6 gap-y-16 lg:grid-cols-2">
        <div>
          <Reveal className="meta mb-4">Education</Reveal>
          <div className="border-t border-rule">
            {education.map((e) => (
              <Reveal key={e.title}>
                <div className="border-b border-rule py-5">
                  <div className="meta">{e.period}</div>
                  <div className="mt-1.5 text-[17px] font-medium leading-snug tracking-[-0.01em]">{e.title}</div>
                  <div className="mt-0.5 text-[15px] text-grey">
                    {e.org}
                    {e.note && `. ${e.note}`}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <Reveal className="meta mb-4">Certifications</Reveal>
          <div className="border-t border-rule">
            {certifications.map((c) => (
              <Reveal key={c.title}>
                <div className="border-b border-rule py-5">
                  <div className="meta">{c.year}</div>
                  <div className="mt-1.5 text-[17px] font-medium leading-snug tracking-[-0.01em]">{c.title}</div>
                  <div className="mt-0.5 text-[15px] text-grey">{c.org}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
