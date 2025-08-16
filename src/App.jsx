import { useEffect, useRef, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustedBy } from "./components/TrustedBy";
import { Services } from "./components/Services";
import { OurWork } from "./components/OurWork";
import { Teams } from "./components/Teams";
import { ContactUs } from "./components/ContactUs";
import { Toaster } from 'react-hot-toast';
import { Footer } from "./components/Footer";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  // Refs for custom cursor position tracking
  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);

    const handleMouseMove = (e) => {
      mouse.current.x = Math.min(Math.max(e.clientX, 0), window.innerWidth);
      mouse.current.y = Math.min(Math.max(e.clientY, 0), window.innerHeight);
    };

    document.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Smoothly interpolate cursor position
      position.current.x += (mouse.current.x - position.current.x) * 0.1;
      position.current.y += (mouse.current.y - position.current.y) * 0.1;

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0)`;
        outlineRef.current.style.transform = `translate3d(${position.current.x - 20}px, ${position.current.y - 20}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
    <>
      <div className="dark:bg-black relative min-h-screen">
        <Toaster />
        <Navbar theme={theme} setTheme={setTheme} />
        <Hero />
        <TrustedBy />
        <Services />
        <OurWork />
        <Teams />
        <ContactUs />
        <Footer theme={theme} />

        {/* Custom Cursor Ring */}
        <div
          ref={outlineRef}
          className="fixed top-0 left-0 h-10 w-10 rounded-full border border-primary pointer-events-none z-[9999]"
          style={{transition:'transform 0.1s  ease-out'}}
        ></div>

        {/* Custom Cursor Dot */}
        <div
          ref={dotRef}
          className="fixed top-0 left-0 h-3 w-3 rounded-full bg-primary pointer-events-none z-[9999]"
        ></div>
      </div>
    </>
  );
}

export default App;