// src/components/NavBar.jsx
import React, { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, width: 0, opacity: 0 });
  const delayRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home",    label: "Home",    href: "#home" },
    { id: "contact", label: "Contact", href: "#contact" },
    { id: "faq",     label: "FAQ",     href: "#faq" },
  ];

  const moveIndicatorToAnchor = (anchor) => {
    if (!anchor || !containerRef.current) return;
    const aRect = anchor.getBoundingClientRect();
    const cRect = containerRef.current.getBoundingClientRect();
    clearTimeout(delayRef.current);
    delayRef.current = setTimeout(() => {
      setHoverPosition({
        x: aRect.left - cRect.left,
        width: aRect.width,
        opacity: 1,
      });
    }, 80);
  };

  const handlePointerMove = (e) => {
    const target = e.target;
    const anchor = target.closest?.("a");
    moveIndicatorToAnchor(anchor);
  };

  const handlePointerLeave = () => {
    clearTimeout(delayRef.current);
    setHoverPosition((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleClick = (e) => {
    const anchor = e.currentTarget;
    moveIndicatorToAnchor(anchor);
    setTimeout(() => setHoverPosition((p) => ({ ...p, opacity: 0 })), 500);
  };

  return (
    <div
      className="fixed inset-x-0 z-50 w-11/12 max-w-2xl mx-auto"
      // Safe-area aware top offset; falls back to 0 on browsers without env()
      style={{ top: "calc(env(safe-area-inset-top, 0px) + 1rem)" }}
      // If you prefer Tailwind arbitrary values, you can instead use:
      // className="fixed inset-x-0 z-50 w-11/12 max-w-2xl mx-auto top-[calc(env(safe-area-inset-top,0px)+1rem)]"
    >
      <div className={`relative transition-all duration-500 ${scrolled ? "scale-95" : ""}`}>
        <div className="relative rounded-full overflow-hidden shadow-black/10 shadow-2xl">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-white/05 to-transparent pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />

          <div
            ref={containerRef}
            className="relative flex items-center justify-between px-6 py-2 select-none"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <a
              href="#home"
              className="text-lg font-bold text-white hover:text-[#007AFF] transition-colors"
              onClick={handleClick}
            >
              Smashspeed
            </a>

            <div
              className="absolute top-1/2 -translate-y-1/2 h-8 rounded-full transition-all duration-300 ease-out pointer-events-none"
              style={{
                left: `${hoverPosition.x}px`,
                width: `${hoverPosition.width}px`,
                opacity: hoverPosition.opacity,
                backgroundColor: "rgba(0, 122, 255, 0.15)",
                boxShadow: "0 0 20px rgba(0, 122, 255, 0.4)",
              }}
            />

            <ul className="flex items-center space-x-1 sm:space-x-4 relative">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="px-3 sm:px-4 py-2 text-sm font-medium rounded-full text-gray-300 hover:text-[#007AFF] transition-colors"
                    onClick={handleClick}
                    onPointerDown={(e) => moveIndicatorToAnchor(e.currentTarget)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
