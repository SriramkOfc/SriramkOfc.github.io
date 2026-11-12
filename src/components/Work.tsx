import { projects, profile } from "@/data/profile";
import Reveal from "./Reveal";
import { ArrowUpRight, GitHubIcon } from "./Icons";

function Waveform() {
  const bars = Array.from({ length: 56 }, (_, i) => {
    const t = i / 55;
    const env = Math.sin(t * Math.PI);
    return Math.round((8 + env * (20 + 46 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.55)))) * 10) / 10;
  });
  return (
    <div className="flex h-36 items-center justify-center gap-[5px] overflow-hidden" aria-hidden>
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[4px] shrink-0 rounded-full bg-gradient-to-t from-blue via-violet to-peach opacity-80 transition-transform duration-700 group-hover:scale-y-125"
          style={{ height: `${h}px`, transitionDelay: `${i * 6}ms` }}
        />
      ))}
    </div>
  );
}

export default function Work() {
  const [featured, ...others] = projects;
  return (
    <section id="work" className="relative bg-white">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal className="text-sm font-semibold text-blue">Work</Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-[clamp(2.4rem,5vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                Selected work.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-bg px-5 py-3 text-sm font-medium transition-colors hover:bg-[#ebebef]"
            >
              <GitHubIcon /> More on GitHub
            </a>
          </Reveal>
        </div>

        {/* featured */}
        <Reveal className="mt-14">
          <article className="group relative overflow-hidden rounded-[32px] bg-ink text-white">
            <div
              aria-hidden
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(60% 80% at 85% 20%, rgba(124,92,255,0.45), transparent 60%), radial-gradient(50% 70% at 10% 100%, rgba(0,102,255,0.4), transparent 60%)",
              }}
            />
            <div className="relative grid items-center gap-10 p-7 sm:p-12 lg:grid-cols-2 lg:p-14">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-peach" />
                  {featured.status} · {featured.kicker}
                </div>
                <h3 className="mt-6 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">{featured.title}</h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">{featured.blurb}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {featured.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/75">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur sm:p-6">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span className="flex items-center gap-2">
                    <span className="live-dot h-2 w-2 rounded-full bg-[#34c759]" /> Demo call
                  </span>
                  <span className="font-mono">00:42</span>
                </div>
                <Waveform />
                <div className="space-y-2 text-[13px]">
                  <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white/10 px-3.5 py-2 text-white/80">
                    I need to move my appointment to Thursday.
                  </div>
                  <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-blue px-3.5 py-2">
                    Done — you&apos;re booked for Thursday 10am. Want a reminder?
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {others.map((p, i) => {
            const Tag = p.href ? "a" : "article";
            return (
              <Reveal key={p.id} delay={i * 80}>
                <Tag
                  {...(p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col rounded-[28px] bg-bg p-8 transition-colors hover:bg-[#ededf1] sm:p-10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">{p.kicker}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-faint shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all group-hover:text-blue">
                      <ArrowUpRight />
                    </span>
                  </div>
                  <h3 className="mt-10 text-3xl font-semibold leading-tight tracking-[-0.03em]">{p.title}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{p.blurb}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-8">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </Tag>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
