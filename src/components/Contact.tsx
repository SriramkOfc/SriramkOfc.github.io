import { profile } from "@/data/profile";
import Reveal from "./Reveal";
import { ArrowUpRight, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pb-10 pt-28 sm:px-6 md:pt-40">
      <Reveal>
        <div className="relative overflow-hidden rounded-[40px] bg-ink px-6 py-20 text-center text-white sm:px-12 md:py-28">
          {/* glossy orbs (CSS 3D) */}
          <div
            aria-hidden
            className="floaty absolute -left-10 top-10 h-40 w-40 rounded-full opacity-90 sm:h-56 sm:w-56"
            style={{
              background: "radial-gradient(circle at 32% 28%, #fff 0 6%, #9db4ff 22%, #0066ff 55%, #0a1a66 100%)",
              boxShadow: "0 40px 80px -20px rgba(0,102,255,0.6)",
            }}
          />
          <div
            aria-hidden
            className="floaty absolute -bottom-16 -right-8 h-48 w-48 rounded-full opacity-90 sm:h-72 sm:w-72"
            style={{
              ["--fd" as string]: "1.5s",
              background: "radial-gradient(circle at 30% 28%, #fff 0 5%, #d9ccff 20%, #7c5cff 55%, #2a1466 100%)",
              boxShadow: "0 40px 80px -20px rgba(124,92,255,0.6)",
            }}
          />
          <div
            aria-hidden
            className="floaty absolute right-[18%] top-10 h-12 w-12 rounded-full"
            style={{
              ["--fd" as string]: "0.7s",
              background: "radial-gradient(circle at 32% 28%, #fff 0 8%, #ffd2c0 25%, #ff9f7a 60%, #a3462a 100%)",
            }}
          />

          <div className="relative">
            <p className="text-sm font-medium text-white/60">Contact</p>
            <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              Let&apos;s build something <span className="text-gradient">that ships.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/65">
              Hiring for AI engineering, or need an LLM feature that holds up in production? I&apos;d love to hear about it.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[15px] font-semibold text-ink transition-transform hover:scale-[1.03]"
              >
                <MailIcon /> {profile.email}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-[15px] font-medium transition-colors hover:bg-white/10"
              >
                <LinkedInIcon /> LinkedIn <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-[15px] font-medium transition-colors hover:bg-white/10"
              >
                <GitHubIcon /> GitHub <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <footer className="flex flex-col items-center justify-between gap-3 px-2 pt-10 text-sm text-faint sm:flex-row">
        <span>© 2026 {profile.name}</span>
        <span>{profile.location}</span>
        <a href="#top" className="transition-colors hover:text-ink">
          Back to top ↑
        </a>
      </footer>
    </section>
  );
}
