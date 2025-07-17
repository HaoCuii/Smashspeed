// src/components/Background.jsx
import React, { useState, useEffect, useRef } from 'react';

const Background = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

  const mouseRef = useRef({ x: 50, y: 50 });
  const rafRef = useRef(null);

  // 1) Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
    }));
    setParticles(newParticles);
  }, []);

  // 2) Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          x: (p.x + p.vx + 100) % 100,
          y: (p.y + p.vy + 100) % 100,
        }))
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // 3) Throttled mouse tracking
  useEffect(() => {
    const handleMouseMove = e => {
      if (!containerRef.current) return;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - left) / width) * 100,
        y: ((e.clientY - top) / height) * 100,
      };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setMousePos(mouseRef.current);
          rafRef.current = null;
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Base gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />

      {/* Radial overlay */}
      <div
        className="fixed inset-0 opacity-60 pointer-events-none"
        style={{
          background: `radial-gradient(
            circle at ${mousePos.x}% ${mousePos.y}%,
            rgba(0,122,255,0.15) 0%,
            rgba(0,122,255,0.05) 40%,
            transparent 70%
          )`,
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute bg-[#007AFF] rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: `0 0 ${p.size * 3}px rgba(0,122,255,0.5)`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Large floating glass orbs (only two now) */}
      <div className="fixed inset-0 pointer-events-none">
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
      </div>

      {/* Geometric glass shapes (hexagon + triangle) */}
      <div className="fixed inset-0 pointer-events-none">
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
      </div>

      {/* One flowing glass ribbon */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute h-1 transition-all duration-500"
          style={{
            width: '200%',
            left: '-50%',
            top: `${30 + mousePos.y * 0.1}%`,
            background:
              'linear-gradient(90deg, transparent, rgba(0,122,255,0.3), transparent)',
            backdropFilter: 'blur(2px)',
            boxShadow: '0 0 20px rgba(0,122,255,0.5)',
            animation: 'flow 12s linear infinite',
          }}
        />
      </div>

      {/* One interactive glass card */}
      <div className="fixed inset-0 pointer-events-none">
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

      {/* Edge glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#007AFF]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#007AFF]/10 to-transparent" />
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#007AFF]/10 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#007AFF]/10 to-transparent" />
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%,100% { transform: translateY(0) rotate(0); }
          50%     { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes rotate {
          from { transform: rotate(0); }
          to   { transform: rotate(360deg); }
        }
        @keyframes flow {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes twinkle {
          0%   { opacity: 0.3; transform: scale(0.8); }
          100% { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>

      {/* Page content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Background;
