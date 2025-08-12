// src/components/NavBar.jsx
import React, { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, width: 0, opacity: 0 });
  const delayRef = useRef(null);
  const containerRef = useRef(null); // the same element the indicator is absolutely positioned in

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
    const cRect = containerRef.current.getBoundingClientRect(); // align to the same offset parent
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

  // For tap/click on mobile to “lock” the highlight briefly
  const handleClick = (e) => {
    const anchor = e.currentTarget;
    moveIndicatorToAnchor(anchor);
    // keep it visible for a moment on touch to feel responsive
    setTimeout(() => setHoverPosition((p) => ({ ...p, opacity: 0 })), 500);
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-2xl">
      <div className={`relative transition-all duration-500 ${scrolled ? "scale-95" : ""}`}>
        {/* Glass-morphism pill */}
        <div className="relative rounded-full overflow-hidden shadow-black/10 shadow-2xl">
          {/* Translucent blur background */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-white/05 to-transparent" />
          {/* Thin white stroke */}
          <div className="absolute inset-0 rounded-full border border-white/20" />

          {/* Content (this is the positioning container for the indicator) */}
          <div
            ref={containerRef}
            className="relative flex items-center justify-between px-6 py-2 select-none"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            {/* Logo */}
            <a
              href="#home"
              className="text-lg font-bold text-white hover:text-[#007AFF] transition-colors"
              onClick={handleClick}
            >
              Smashspeed
            </a>

            {/* Hover / Tap indicator */}
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

            {/* Navigation Links */}
            <ul className="flex items-center space-x-1 sm:space-x-4 relative">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="px-3 sm:px-4 py-2 text-sm font-medium rounded-full text-gray-300 hover:text-[#007AFF] transition-colors"
                    onClick={handleClick}
                    onPointerDown={(e) => moveIndicatorToAnchor(e.currentTarget)} // instant feedback on touch
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
