import { profile } from "@/data/profile";
import Scene from "./Scene";
import { ArrowRight, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

function FloatCard({
  className,
  delay,
  fd,
  children,
}: {
  className: string;
  delay: number;
  fd: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`fade-up pointer-events-none absolute z-10 ${className}`} style={{ ["--d" as string]: `${delay}ms` }}>
      <div className="glass floaty rounded-2xl px-4 py-3" style={{ ["--fd" as string]: fd }}>
        {children}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* soft background */}
      <div className="dot-bg absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,#000,transparent)]" />
      <div
        aria-hidden
        className="absolute -right-32 top-10 -z-10 h-[40rem] w-[40rem] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(124,92,255,0.22), transparent)" }}
      />
      <div
        aria-hidden
        className="absolute -left-40 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(255,159,122,0.25), transparent)" }}
      />

      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-6 px-6 pb-16 pt-28 lg:grid-cols-12 lg:pt-24">
        {/* copy */}
        <div className="relative z-10 lg:col-span-6">
          <div className="fade-up glass inline-flex items-center gap-2 rounded-full py-1.5 pl-2 pr-4 text-[13px] text-ink-2" style={{ ["--d" as string]: "50ms" }}>
            <span className="live-dot ml-1 h-2 w-2 rounded-full bg-[#34c759]" />
            AI Engineer at FinTalkr · Sydney
          </div>

          <p className="fade-up mt-8 text-xl font-medium text-muted sm:text-2xl" style={{ ["--d" as string]: "150ms" }}>
            Hello, I&apos;m
          </p>
          <h1 className="fade-up mt-1 text-[clamp(3.2rem,11vw,6rem)] lg:text-[clamp(4rem,6.6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.045em]" style={{ ["--d" as string]: "250ms" }}>
            {profile.firstName}
            <br />
            <span className="text-gradient">{profile.lastName}</span>
          </h1>

          <p className="fade-up mt-7 max-w-md text-lg leading-relaxed text-ink-2 sm:text-xl" style={{ ["--d" as string]: "400ms" }}>
            AI Engineer building <strong className="font-semibold text-ink">LLM apps, RAG &amp; agents</strong> that hold up in
            production — for a fintech platform used by licensed financial advisers.
          </p>

          <div className="fade-up mt-9 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "550ms" }}>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3.5 text-[15px] font-medium text-white shadow-[0_10px_30px_-10px_rgba(0,102,255,0.7)] transition-transform hover:scale-[1.03]"
            >
              View my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#experience"
              className="inline-flex items-center rounded-full bg-white px-6 py-3.5 text-[15px] font-medium text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-12px_rgba(0,0,0,0.2)] transition-transform hover:scale-[1.03]"
            >
              Experience
            </a>
          </div>

          <div className="fade-up mt-10 flex items-center gap-3" style={{ ["--d" as string]: "700ms" }}>
            {[
              { href: profile.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
              { href: profile.github, label: "GitHub", Icon: GitHubIcon },
              { href: `mailto:${profile.email}`, label: "Email", Icon: MailIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink-2 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_-12px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 hover:text-blue"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
            <span className="ml-2 text-sm text-faint">{profile.workRights}</span>
          </div>
        </div>

        {/* 3D */}
        <div className="relative h-[420px] sm:h-[520px] lg:col-span-6 lg:h-[640px]">
          <div className="fade-up absolute inset-0 -mx-6 lg:-left-16 lg:-right-28 lg:mx-0" style={{ ["--d" as string]: "200ms" }}>
            <Scene />
          </div>

          <FloatCard className="left-0 top-[8%] sm:left-[2%]" delay={900} fd="0s">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue to-violet text-sm font-semibold text-white">
                AI
              </span>
              <div>
                <div className="text-[13px] font-semibold">LLM features</div>
                <div className="text-[11px] text-muted">in production · 1.5 yrs</div>
              </div>
            </div>
          </FloatCard>

          <FloatCard className="right-0 top-[44%] sm:right-[-2%]" delay={1050} fd="1.2s">
            <div className="text-[11px] text-muted">Stack</div>
            <div className="mt-0.5 text-[13px] font-semibold">Python · LangGraph · Azure</div>
          </FloatCard>

          <FloatCard className="bottom-[6%] left-[8%]" delay={1200} fd="2.4s">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#34c759]/15 text-[13px] text-[#1f9d45]">✓</span>
              <div className="text-[13px] font-semibold">Accuracy ↑ · Hallucinations ↓</div>
            </div>
          </FloatCard>
        </div>
      </div>

      <a href="#about" aria-label="Scroll to about" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-black/15 pt-2">
          <span className="scroll-hint h-2 w-1 rounded-full bg-black/40" />
        </span>
      </a>
    </section>
  );
}
