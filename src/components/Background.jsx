// src/components/Background.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';

/**
 * Memoized component for static visual elements that do not change.
 * This prevents them from re-rendering when the parent state changes.
 */
const StaticElements = React.memo(() => (
  <>
    {/* Base gradient */}
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />

    {/* Edge glow effects */}
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#007AFF]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#007AFF]/10 to-transparent" />
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#007AFF]/10 to-transparent" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#007AFF]/10 to-transparent" />
    </div>

    {/* Keyframe animations are defined once */}
    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes flow {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      @keyframes twinkle {
        from { opacity: 0.3; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1.2); }
      }
      @keyframes gentle-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `}</style>
  </>
));

/**
 * Memoized component for a single particle.
 * This is good practice, though its props update every frame in this case.
 */
const Particle = React.memo(({ p }) => (
  <div
    className="absolute bg-[#007AFF] rounded-full"
    style={{
      left: `${p.x}%`,
      top: `${p.y}%`,
      opacity: p.opacity,
      width: `${p.size}px`,
      height: `${p.size}px`,
      boxShadow: `0 0 ${p.size * 3}px rgba(0,122,255,0.5)`,
      animation: `twinkle ${p.animationDuration}s ease-in-out infinite alternate`,
      animationDelay: `${p.animationDelay}s`,
    }}
  />
));

const Background = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 50, y: 50 });
  const animationFrameRef = useRef(null);

  // 1. Initialize particles once using useMemo and pre-calculate random values.
  const initialParticles = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      animationDuration: 2 + Math.random() * 3,
      animationDelay: Math.random() * 2,
    })),
    [] // Empty dependency array ensures this runs only once.
  );

  // 2. Set initial particle state.
  useEffect(() => {
    setParticles(initialParticles);
  }, [initialParticles]);

  // 3. Combined setup for mouse listener and animation loop.
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      // Update ref directly to avoid re-renders on every mouse move.
      mouseRef.current = {
        x: ((e.clientX - left) / width) * 100,
        y: ((e.clientY - top) / height) * 100,
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Single animation loop for both particles and mouse position.
    const animate = () => {
      // Update particle positions.
      setParticles((prevParticles) =>
        prevParticles.map((p) => ({
          ...p,
          x: (p.x + p.vx + 100) % 100,
          y: (p.y + p.vy + 100) % 100,
        }))
      );
      // Update mouse position state (throttled by rAF).
      setMousePos(mouseRef.current);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start the animation loop.
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup function.
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Runs only once on mount.

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      <StaticElements />

      {/* Radial overlay (depends on mousePos) */}
      <div
        className="fixed inset-0 opacity-60 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(0,122,255,0.15), rgba(0,122,255,0.05) 40%, transparent 70%)`,
        }}
      />

      {/* Floating particles (rendered via memoized component) */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((p) => (
          <Particle key={p.id} p={p} />
        ))}
      </div>

      {/* Dynamic elements that depend on mousePos for parallax effect */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Large floating glass orbs */}
        <div
          className="absolute w-80 h-80 rounded-full transition-all duration-1000 ease-out"
          style={{
            left: `${20 + mousePos.x * 0.1}%`,
            top: `${15 + mousePos.y * 0.1}%`,
            background: 'rgba(0,122,255,0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,122,255,0.2)',
            boxShadow: '0 0 100px rgba(0,122,255,0.3), inset 0 0 100px rgba(0,122,255,0.1)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-60 h-60 rounded-full transition-all duration-1000 ease-out"
          style={{
            right: `${10 + mousePos.x * 0.08}%`,
            top: `${40 + mousePos.y * 0.12}%`,
            background: 'rgba(0,122,255,0.08)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(0,122,255,0.15)',
            boxShadow: '0 0 80px rgba(0,122,255,0.25), inset 0 0 80px rgba(0,122,255,0.08)',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />
        {/* Geometric glass shapes */}
        <div
          className="absolute w-32 h-32 transition-all duration-700 ease-out"
          style={{
            left: `${30 + mousePos.x * 0.05}%`,
            top: `${60 + mousePos.y * 0.07}%`,
            background: 'rgba(0,122,255,0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0,122,255,0.2)',
            clipPath: 'polygon(50% 0%,100%25%,100%75%,50%100%,0%75%,0%25%)',
            boxShadow: '0 0 40px rgba(0,122,255,0.3)',
            animation: 'rotate 20s linear infinite',
          }}
        />
        <div
          className="absolute w-24 h-24 transition-all duration-700 ease-out"
          style={{
            right: `${25 + mousePos.x * 0.04}%`,
            bottom: `${35 + mousePos.y * 0.06}%`,
            background: 'rgba(0,122,255,0.06)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0,122,255,0.18)',
            clipPath: 'polygon(50% 0%,0%100%,100%100%)',
            boxShadow: '0 0 30px rgba(0,122,255,0.25)',
            animation: 'rotate 15s linear infinite reverse',
          }}
        />
        {/* Flowing glass ribbon */}
        <div
          className="absolute h-1 transition-all duration-500"
          style={{
            width: '200%',
            left: '-50%',
            top: `${30 + mousePos.y * 0.1}%`,
            background: 'linear-gradient(90deg, transparent, rgba(0,122,255,0.3), transparent)',
            backdropFilter: 'blur(2px)',
            boxShadow: '0 0 20px rgba(0,122,255,0.5)',
            animation: 'flow 12s linear infinite',
          }}
        />
        {/* Interactive glass card */}
        <div
          className="absolute w-48 h-32 rounded-2xl transition-all duration-1000 ease-out hover:scale-105"
          style={{
            left: `${10 + mousePos.x * 0.02}%`,
            top: `${45 + mousePos.y * 0.03}%`,
            background: 'rgba(0,122,255,0.05)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(0,122,255,0.15)',
            boxShadow: '0 8px 32px rgba(0,122,255,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
            animation: 'gentle-float 7s ease-in-out infinite',
          }}
        />
      </div>

      {/* Page content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Background;