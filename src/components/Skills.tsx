import { skills, certifications } from "@/data/profile";
import Reveal from "./Reveal";
import { SkillIcon } from "./Icons";

export default function Skills() {
  const [ai, ...rest] = skills;
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28 md:py-40">
      <div className="text-center">
        <Reveal className="text-sm font-semibold text-blue">Skills</Reveal>
        <Reveal delay={80}>
          <h2 className="mx-auto mt-4 max-w-3xl text-[clamp(2.4rem,5vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            The toolkit behind <span className="text-gradient">the shipping.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* hero tile */}
        <Reveal className="relative overflow-hidden rounded-[28px] bg-ink p-8 text-white md:col-span-2 lg:row-span-2 lg:p-10">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(0,102,255,0.55), transparent)" }}
          />
          <div
            aria-hidden
            className="absolute -bottom-24 left-10 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(124,92,255,0.45), transparent)" }}
          />
          <div className="relative">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
              <SkillIcon name={ai.icon} className="h-6 w-6" />
            </span>
            <h3 className="mt-6 text-sm font-medium text-white/60">{ai.group}</h3>
            <p className="mt-2 max-w-md text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
              Where most of my hours go.
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
              {ai.items.map((s) => (
                <span key={s} className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm text-white/90 backdrop-blur transition-colors hover:bg-white/15">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {rest.map((g, i) => (
          <Reveal key={g.group} delay={80 + i * 60} className={`card p-7 ${i === rest.length - 1 ? "lg:col-span-2" : ""}`}>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-bg text-blue">
              <SkillIcon name={g.icon} />
            </span>
            <h3 className="mt-5 font-semibold tracking-tight">{g.group}</h3>
            <div className="mt-3 flex flex-wrap gap-x-1.5 gap-y-1 text-[15px] leading-relaxed text-muted">
              {g.items.map((s, j) => (
                <span key={s}>
                  {s}
                  {j < g.items.length - 1 && <span className="text-faint"> ·</span>}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      {/* certifications */}
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={i * 70} className="card flex items-center gap-4 p-6">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-[13px] font-semibold text-white shadow-[inset_0_-6px_12px_rgba(0,0,0,0.15)]"
              style={{
                background:
                  c.issuer === "Microsoft"
                    ? "linear-gradient(135deg,#0066ff,#7c5cff)"
                    : "linear-gradient(135deg,#7c5cff,#ff9f7a)",
              }}
            >
              {c.code}
            </span>
            <div>
              <div className="text-xs text-faint">
                {c.issuer} · {c.year}
              </div>
              <div className="mt-0.5 font-semibold leading-snug tracking-tight">{c.name}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
