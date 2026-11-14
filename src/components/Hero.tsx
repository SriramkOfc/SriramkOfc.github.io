import { profile, intro } from "@/data/profile";
import Scene from "./Scene";

export default function Hero() {
  return (
    <section id="top" className="pt-14">
      <div className="mx-auto max-w-[1200px] px-5 pb-12 pt-16 sm:px-8 md:pb-16 md:pt-24">
        <p className="t-small font-medium">
          <span className="text-accent">{profile.role}</span>
          <span className="mx-2 text-rule">/</span>
          {profile.location}
        </p>
        <div className="mt-6 grid gap-10 md:grid-cols-12 md:items-end md:gap-6">
          <h1 className="t-display md:col-span-8">
            Sriram
            <br />
            Karthikeyan
          </h1>
          <div className="md:col-span-4 md:pb-2">
            <p className="t-lead">{intro}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
              <a href="#experience" className="link">
                Experience
              </a>
              <a href={`mailto:${profile.email}`} className="link">
                Email me
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* The work, as a diagram */}
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-white sm:aspect-[16/8] lg:aspect-[21/9]">
          <Scene />
        </div>
      </div>
    </section>
  );
}
