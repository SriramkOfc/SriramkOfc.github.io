import { offguard, upcoming, profile } from "@/data/profile";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Work() {
  return (
    <Section
      id="work"
      index="01"
      title="Selected work"
      intro="Things I have built outside my day job, and write-ups of the work I do inside it."
      tone="white"
    >
      {/* Featured project */}
      <Reveal>
        <article className="rounded-[20px] bg-paper p-6 sm:p-10 md:p-12">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="t-small">
                {offguard.type} · {offguard.year}
              </p>
              <h3 className="t-h2 mt-3">{offguard.title}</h3>
              <p className="t-lead mt-5 max-w-[44ch]">{offguard.summary}</p>
            </div>
            <div className="t-small md:col-span-4 md:col-start-9 md:self-end">
              <p className="font-medium text-ink">Stack</p>
              <p className="mt-1">{offguard.stack.join(", ")}</p>
            </div>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {offguard.steps.map((s) => (
              <li key={s.k} className="rounded-2xl bg-white p-6">
                <span className="t-small font-medium text-accent">{s.k}</span>
                <h4 className="t-h3 mt-2">{s.title}</h4>
                <p className="t-body mt-2 !text-[15px]">{s.body}</p>
              </li>
            ))}
          </ol>
        </article>
      </Reveal>

      {/* In progress */}
      <div className="mt-16">
        <Reveal>
          <h3 className="t-h3">In progress</h3>
        </Reveal>
        <ul className="mt-6 border-t border-rule">
          {upcoming.map((u, i) => (
            <Reveal
              as="li"
              key={u.title}
              delay={i * 60}
              className="flex flex-col gap-1 border-b border-rule py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="text-[17px] font-medium tracking-[-0.01em]">{u.title}</span>
              <span className="t-small shrink-0">
                {u.note} · {u.status}
              </span>
            </Reveal>
          ))}
        </ul>
        <Reveal className="t-body mt-6">
          Code and experiments are on{" "}
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link text-ink">
            GitHub
          </a>
          .
        </Reveal>
      </div>
    </Section>
  );
}
