import { profile } from "@/data/profile";
import Section from "./Section";
import Reveal from "./Reveal";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin },
  { label: "GitHub", value: profile.githubLabel, href: profile.github },
];

export default function Contact() {
  return (
    <>
      <Section
        id="contact"
        index="04"
        title="Contact"
        intro="Hiring for AI engineering, or want to talk about LLMs in production? Email is the fastest way to reach me."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 60}>
              <a
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between gap-10 rounded-2xl bg-white p-6 transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)]"
              >
                <span className="flex items-center justify-between">
                  <span className="t-small">{l.label}</span>
                  <span aria-hidden className="text-grey transition-all group-hover:translate-x-0.5 group-hover:text-accent">
                    →
                  </span>
                </span>
                <span className="break-all text-[17px] font-medium tracking-[-0.01em] transition-colors group-hover:text-accent">
                  {l.value}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <footer className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="t-small flex flex-col gap-1 border-t border-rule py-8 sm:flex-row sm:justify-between">
          <span>© 2026 {profile.name}</span>
          <span>{profile.location}</span>
        </div>
      </footer>
    </>
  );
}
