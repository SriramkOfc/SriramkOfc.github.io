import { experience, education } from "@/data/profile";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="relative bg-white">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal className="text-sm font-semibold text-blue">Experience</Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-[clamp(2.4rem,5vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                Where I&apos;ve <br className="hidden lg:block" />
                done the work.
              </h2>
            </Reveal>
            <Reveal delay={160} className="mt-5 max-w-sm text-lg leading-relaxed text-muted">
              Engineering, QA, data and years of talking to customers — now all pointed at shipping AI.
            </Reveal>

            <Reveal delay={220} className="mt-10 hidden space-y-4 lg:block">
              <div className="text-sm font-semibold text-ink">Education</div>
              {education.map((e) => (
                <div key={e.degree} className="rounded-2xl bg-bg p-5">
                  <div className="text-[15px] font-semibold leading-snug tracking-tight">{e.degree}</div>
                  <div className="mt-1 text-sm text-muted">{e.school}</div>
                  <div className="mt-2 text-xs text-faint">
                    {e.period}
                    {e.note && ` · ${e.note}`}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <ol className="relative space-y-4 lg:col-span-8">
          {experience.map((r, i) => (
            <Reveal as="li" key={r.title + r.org} delay={i * 60}>
              <article
                className={`group relative overflow-hidden rounded-[28px] p-7 transition-all duration-500 sm:p-9 ${
                  r.current
                    ? "bg-gradient-to-br from-[#f3f6ff] via-white to-[#f6f2ff] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-28px_rgba(0,102,255,0.45)] ring-1 ring-blue/15"
                    : "bg-bg hover:bg-[#efeff3]"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      {r.period}
                      {r.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#34c759]/12 px-2.5 py-0.5 text-xs font-medium text-[#1f9d45]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#34c759]" />
                          Now
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-[1.7rem]">{r.title}</h3>
                    <div className="mt-1 text-[15px] text-ink-2">
                      <span className="font-medium">{r.org}</span>
                      <span className="text-faint"> · {r.place}</span>
                    </div>
                  </div>
                  <span className="text-5xl font-semibold tracking-[-0.05em] text-black/[0.06] transition-colors group-hover:text-black/[0.1] sm:text-6xl">
                    {r.start}
                  </span>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                      <span className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-blue to-violet" />
                      {p}
                    </li>
                  ))}
                </ul>

                {r.tags && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {r.tags.map((t) => (
                      <span key={t} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-muted shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}

          {/* education (mobile/tablet) */}
          <Reveal as="li" className="space-y-4 pt-8 lg:hidden">
            <div className="text-sm font-semibold">Education</div>
            {education.map((e) => (
              <div key={e.degree} className="rounded-2xl bg-bg p-5">
                <div className="text-[15px] font-semibold leading-snug tracking-tight">{e.degree}</div>
                <div className="mt-1 text-sm text-muted">{e.school}</div>
                <div className="mt-2 text-xs text-faint">
                  {e.period}
                  {e.note && ` · ${e.note}`}
                </div>
              </div>
            ))}
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
