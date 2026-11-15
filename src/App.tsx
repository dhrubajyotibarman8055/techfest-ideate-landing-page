import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { initScroll, startScroll, stopScroll, ScrollTrigger } from "./lib/scroll";
import { Preloader } from "./components/Preloader";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { MarqueeCross } from "./components/Marquee";
import { About } from "./components/About";
import { Events } from "./components/Events";
import { Domains } from "./components/Domains";
import { Stats } from "./components/Stats";
import { Gallery } from "./components/Gallery";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const destroy = initScroll();
    stopScroll();
    return destroy;
  }, []);

  useEffect(() => {
    if (!ready) return;
    startScroll();
    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => clearTimeout(t);
  }, [ready]);

  const done = useCallback(() => setReady(true), []);

  return (
    <div className="grain">
      <AnimatePresence>{!ready && <Preloader onDone={done} />}</AnimatePresence>
      <Cursor />
      <Nav />
      <main>
        <Hero ready={ready} />
        <MarqueeCross />
        <About />
        <Events />
        <Domains />
        <Stats />
        <Gallery />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
