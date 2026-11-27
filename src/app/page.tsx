import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ChatWidget from "@/components/chat/ChatWidget";
import VisitAlert from "@/components/VisitAlert";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Contact />
      </main>
      <ChatWidget />
      <VisitAlert />
    </>
  );
}
