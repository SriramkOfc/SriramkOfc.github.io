import { experience, education, certifications } from "@/data/profile";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      title="Experience"
      intro="Engineering, QA, data and a lot of talking to customers, now pointed at AI."
    >
      <ol className="border-t border-rule">
        {experience.map((r, i) => (
          <Reveal as="li" key={r.title + r.org} delay={i * 40} className="border-b border-rule py-8 md:py-10">
            <div className="grid gap-4 md:grid-cols-12 md:gap-6">
              <div className="md:col-span-3">
                <p className="t-small">
                  {r.period}
                  {r.current && <span className="ml-2 font-medium text-accent">Current</span>}
                </p>
              </div>
              <div className="md:col-span-9">
                <h3 className="t-h3">{r.title}</h3>
                <p className="mt-1 text-[17px] text-ink">
                  {r.org}
                  <span className="text-grey">, {r.place}</span>
                </p>
                <ul className="mt-5 space-y-2.5">
                  {r.points.map((p) => (
                    <li key={p} className="t-body relative pl-5">
                      <span className="absolute left-0 top-[0.72em] h-[5px] w-[5px] rounded-full bg-grey/60" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="mt-20 grid gap-12 md:grid-cols-2 md:gap-6">
        {[
          { heading: "Education", items: education.map((e) => ({ k: e.period, t: e.title, s: e.note ? `${e.org}. ${e.note}` : e.org })) },
          { heading: "Certifications", items: certifications.map((c) => ({ k: c.year, t: c.title, s: c.org })) },
        ].map((col) => (
          <div key={col.heading}>
            <Reveal>
              <h3 className="t-h3">{col.heading}</h3>
            </Reveal>
            <ul className="mt-6 border-t border-rule">
              {col.items.map((it) => (
                <Reveal as="li" key={it.t} className="border-b border-rule py-5">
                  <p className="t-small">{it.k}</p>
                  <p className="mt-1 text-[17px] font-medium tracking-[-0.01em]">{it.t}</p>
                  <p className="t-small mt-0.5">{it.s}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
