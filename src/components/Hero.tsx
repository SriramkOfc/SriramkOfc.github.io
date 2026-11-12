import { profile, intro } from "@/data/profile";
import Scene from "./Scene";

const meta = [
  ["Role", profile.role],
  ["Currently", "FinTalkr"],
  ["Based in", profile.location],
  ["Status", profile.workRights],
];

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[1200px] px-5 pt-14 sm:px-8">
      <div className="grid grid-cols-12 items-end gap-x-6 pb-12 pt-10 md:pt-14">
        <div className="col-span-12 lg:col-span-7">
          <h1 className="text-[clamp(3.6rem,12.5vw,8.75rem)] font-medium leading-[0.88] tracking-[-0.055em]">
            Sriram
            <br />
            Karthikeyan
          </h1>
          <p className="mt-10 max-w-[38ch] text-[1.35rem] leading-[1.35] tracking-[-0.01em] text-ink-2 sm:text-[1.6rem]">
            {intro}
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
            <a href="#work" className="link">
              Selected work
            </a>
            <a href={`mailto:${profile.email}`} className="link">
              {profile.email}
            </a>
          </div>
        </div>

        <div className="relative col-span-12 -mt-2 aspect-[5/4] lg:col-span-5 lg:mt-0 lg:aspect-[4/5]">
          <div className="absolute inset-0 -mx-5 sm:mx-0">
            <Scene />
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-rule py-6 md:grid-cols-4">
        {meta.map(([k, v]) => (
          <div key={k}>
            <dt className="meta">{k}</dt>
            <dd className="mt-1 text-[15px]">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
