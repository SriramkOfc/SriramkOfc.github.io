import { profile } from "@/data/profile";
import Section from "./Section";
import Reveal from "./Reveal";

const links = [
  { label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin },
  { label: "GitHub", value: profile.githubLabel, href: profile.github },
  { label: "Location", value: "Sydney, Australia", href: "" },
];

export default function Contact() {
  return (
    <>
      <Section id="contact" index="04" label="Contact">
        <Reveal>
          <h2 className="max-w-[16ch] text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1] tracking-[-0.045em]">
            Hiring for AI engineering? I&apos;d like to hear about it.
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-12">
          <a
            href={`mailto:${profile.email}`}
            className="link text-[clamp(1.4rem,3.4vw,2.4rem)] tracking-[-0.02em]"
          >
            {profile.email}
          </a>
        </Reveal>

        <div className="mt-16 grid border-t border-rule sm:grid-cols-3">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 60}>
              {(() => {
                const cls = `group flex items-baseline justify-between border-b border-rule py-5 sm:border-b-0 ${
                  i > 0 ? "sm:border-l sm:pl-6" : ""
                } ${i < 2 ? "sm:pr-6" : ""}`;
                const body = (
                  <span>
                    <span className="meta block">{l.label}</span>
                    <span className="mt-1 block text-[15px] transition-colors group-hover:text-accent">{l.value}</span>
                  </span>
                );
                return l.href ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {body}
                    <span aria-hidden className="text-grey transition-transform group-hover:translate-x-0.5 group-hover:text-accent">
                      →
                    </span>
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                );
              })()}
            </Reveal>
          ))}
        </div>
      </Section>

      <footer className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="meta flex flex-col gap-2 border-t border-rule py-6 sm:flex-row sm:justify-between">
          <span>© 2026 {profile.name}</span>
          <span>Built with Next.js and three.js</span>
        </div>
      </footer>
    </>
  );
}
