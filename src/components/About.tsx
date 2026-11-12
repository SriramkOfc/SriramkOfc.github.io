import { highlights, statement, profile } from "@/data/profile";
import Reveal from "./Reveal";
import ScrollWords from "./ScrollWords";

const orgs = ["FinTalkr", "University of Sydney", "CSU San Marcos", "UnfoldLabs", "SoftClouds", "Microsoft Azure", "DataCamp"];

export default function About() {
  return (
    <section id="about" className="relative">
      {/* org strip */}
      <div className="border-y border-hair bg-white/50 py-5">
        <div className="mx-auto flex max-w-6xl items-center gap-8 overflow-hidden px-6">
          <span className="hidden shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-faint sm:inline">Worked & studied with</span>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
            <div className="marquee flex w-max gap-12">
              {[...orgs, ...orgs].map((o, i) => (
                <span key={i} className="whitespace-nowrap text-[17px] font-semibold tracking-tight text-black/35">
                  {o}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <Reveal className="text-sm font-semibold text-blue">About</Reveal>
        <ScrollWords
          text={statement}
          className="mt-5 max-w-5xl text-[clamp(1.9rem,4.4vw,3.6rem)] font-semibold leading-[1.12] tracking-[-0.035em]"
        />

        {/* bento */}
        <div className="mt-20 grid gap-4 md:grid-cols-6">
          <Reveal className="card relative overflow-hidden p-8 md:col-span-4 md:row-span-2 md:p-10">
            <div
              aria-hidden
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(0,102,255,0.3), transparent)" }}
            />
            <div className="relative">
              <div className="text-sm font-medium text-muted">How I work</div>
              <h3 className="mt-3 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-[2.4rem]">
                From a loose requirement to <span className="text-gradient">production code</span> — and the phone call after.
              </h3>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {[
                  ["Context first", "Most LLM failures are context failures. I fix what the model sees before the prompt."],
                  ["End to end", "Scoping with founders and advisers, building, testing, monitoring, supporting."],
                  ["Plain English", "Turning technical issues into decisions non-technical people can make."],
                ].map(([t, b]) => (
                  <div key={t}>
                    <div className="h-1 w-8 rounded-full bg-gradient-to-r from-blue to-violet" />
                    <div className="mt-4 font-semibold tracking-tight">{t}</div>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {highlights.slice(0, 2).map((h, i) => (
            <Reveal key={h.label} delay={80 + i * 80} className="card p-7 md:col-span-2">
              <Stat {...h} />
            </Reveal>
          ))}

          {highlights.slice(2).map((h, i) => (
            <Reveal key={h.label} delay={i * 80} className="card p-7 md:col-span-2">
              <Stat {...h} />
            </Reveal>
          ))}

          <Reveal delay={160} className="relative overflow-hidden rounded-[28px] bg-ink p-7 text-white md:col-span-2">
            <div
              aria-hidden
              className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full blur-2xl"
              style={{ background: "radial-gradient(closest-side, rgba(124,92,255,0.7), transparent)" }}
            />
            <div className="relative">
              <div className="text-sm text-white/60">Based in</div>
              <div className="mt-2 text-3xl font-semibold tracking-[-0.03em]">Sydney, AU</div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[13px] text-white/85">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34c759]" />
                {profile.workRights}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <>
      <div className="text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">
        <span className="text-gradient">{value}</span>
        <span className="text-3xl text-faint">{unit}</span>
      </div>
      <p className="mt-4 text-[15px] leading-snug text-muted">{label}</p>
    </>
  );
}
