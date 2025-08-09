// src/components/Background.jsx
import React, { useEffect, useMemo, useRef } from 'react';

/**
 * Static elements + keyframes (render once).
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

    <style jsx>{`
      :root {
        --mx: 50; /* mouse x in % */
        --my: 50; /* mouse y in % */
      }

      @keyframes twinkle {
        from { opacity: 0.3; transform: translate3d(var(--dx,0), var(--dy,0), 0) scale(0.85); }
        to   { opacity: 1;   transform: translate3d(var(--dx,0), var(--dy,0), 0) scale(1.18); }
      }

      @keyframes drift {
        0%   { transform: translate3d(0,0,0) rotate(0); }
        100% { transform: translate3d(var(--driftX, 80px), var(--driftY, -80px), 0) rotate(360deg); }
      }

      @media (prefers-reduced-motion: reduce) {
        * { animation: none !important; transition: none !important; }
      }
    `}</style>
  </>
));

/**
 * Particle divs never re-render; CSS handles animation.
 */
const Particles = React.memo(({ particles }) => (
  <div className="fixed inset-0 pointer-events-none">
    {particles.map((p) => (
      <div
        key={p.id}
        className="absolute rounded-full"
        style={{
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          background: '#007AFF',
          opacity: p.opacity,
          filter: `drop-shadow(0 0 ${p.size * 2.5}px rgba(0,122,255,0.45))`,
          // wobble + path + distance:
          ['--dx']: `${p.dx}px`,
          ['--dy']: `${p.dy}px`,
          ['--driftX']: `${p.driftX}px`,
          ['--driftY']: `${p.driftY}px`,
          animation: `twinkle ${p.twinkleDur}s ease-in-out ${p.twinkleDelay}s infinite alternate, drift ${p.driftDur}s linear ${p.driftDelay}s infinite`,
          willChange: 'transform, opacity',
        }}
      />
    ))}
  </div>
));

const Background = ({ children, starCount = 60, motion = 1.6 }) => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  // Generate particles once. Motion is handled by CSS vars + keyframes.
  const particles = useMemo(() => {
    // Split across two "depths" for a subtle parallax feel
    const total = Math.max(20, Math.floor(starCount));
    const layers = [
      { count: Math.floor(total * 0.6), sizeMin: 1, sizeMax: 3, speed: 1.0 },
      { count: total - Math.floor(total * 0.6), sizeMin: 0.8, sizeMax: 2, speed: 1.4 }, // faster, smaller stars
    ];

    let id = 0;
    const out = [];
    for (const layer of layers) {
      for (let i = 0; i < layer.count; i++) {
        const size = rand(layer.sizeMin, layer.sizeMax);
        const speed = layer.speed * motion;

        out.push({
          id: id++,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size,
          opacity: 0.25 + Math.random() * 0.6,
          dx: (Math.random() - 0.5) * 6 * speed, // wobble more
          dy: (Math.random() - 0.5) * 6 * speed,
          // Shorter twinkle = more lively
          twinkleDur: rand(1.2, 2.8) / (0.9 + 0.4 * speed),
          twinkleDelay: Math.random() * 2,
          // Stronger drift distance & quicker loop
          driftX: rand(60, 120) * (Math.random() < 0.5 ? -1 : 1) * speed,
          driftY: rand(60, 120) * (Math.random() < 0.5 ? -1 : 1) * speed,
          driftDur: rand(8, 16) / (0.8 + 0.5 * speed),
          driftDelay: Math.random() * 5,
        });
      }
    }
    return out;
  }, [starCount, motion]);

  // Update CSS variables for parallax using rAF (no React state updates).
  useEffect(() => {
    if (!containerRef.current) return;

    let mx = 50;
    let my = 50;
    let ticking = false;

    const onPointerMove = (e) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width) * 100;
      my = ((e.clientY - rect.top) / rect.height) * 100;

      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(() => {
          el.style.setProperty('--mx', String(clamp(mx, 0, 100)));
          el.style.setProperty('--my', String(clamp(my, 0, 100)));
          ticking = false;
        });
      }
    };

    const el = containerRef.current;
    el.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{ ['--mx']: 50, ['--my']: 50 }}
    >
      <StaticElements />

      {/* Radial overlay controlled by CSS vars (no React re-render) */}
      <div
        className="fixed inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at var(--mx)% var(--my)%, rgba(0,122,255,0.15), rgba(0,122,255,0.05) 40%, transparent 70%)',
          willChange: 'background-position',
        }}
      />

      <Particles particles={particles} />

      {/* Page content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Background;

// utils
function rand(min, max) {
  return Math.random() * (max - min) + min;
}
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}
