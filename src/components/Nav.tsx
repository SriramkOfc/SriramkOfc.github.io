"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-rule bg-paper/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="text-[15px] font-medium tracking-[-0.01em]">
          Sriram Karthikeyan
        </a>
        <ul className="flex items-center gap-5 text-[14px] sm:gap-8">
          {links.map((l, i) => (
            <li key={l.href} className={i === 1 || i === 2 ? "hidden sm:block" : ""}>
              <a href={l.href} className="text-ink-2 transition-colors hover:text-accent">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
