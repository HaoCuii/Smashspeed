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
        --mx: 50; /* mouse x in [0..100] */
        --my: 50; /* mouse y in [0..100] */
        --anim: running;
      }

      /* brighter, but only transform animates to keep constant visibility */
      @keyframes twinkle {
        from { transform: translate3d(var(--dx,0), var(--dy,0), 0) scale(0.92); }
        to   { transform: translate3d(var(--dx,0), var(--dy,0), 0) scale(1.16); }
      }

      @keyframes drift {
        0%   { transform: translate3d(0,0,0) rotate(0); }
        100% { transform: translate3d(var(--driftX, 80px), var(--driftY, -80px), 0) rotate(360deg); }
      }

      /* Parallax per layer (composited transforms only) */
      .particles-layer.l0 {
        transform: translate3d(calc((var(--mx) - 50) * 0.25px), calc((var(--my) - 50) * 0.25px), 0);
      }
      .particles-layer.l1 {
        transform: translate3d(calc((var(--mx) - 50) * 0.55px), calc((var(--my) - 50) * 0.55px), 0);
      }

      /* Pause all child animations when container has .paused */
      .paused .star { animation-play-state: paused !important; }

      @media (prefers-reduced-motion: reduce) {
        * { animation: none !important; transition: none !important; }
      }
    `}</style>
  </>
));

/**
 * Particle divs never re-render; CSS handles animation.
 * Two layers for subtle parallax.
 */
const Particles = React.memo(({ layer0, layer1 }) => {
  const renderStar = (p) => (
    <div
      key={p.id}
      className="star absolute rounded-full"
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        /* brighter multi-stop glow (cheap, no filters) */
        background:
          'radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(0,122,255,0.9) 45%, rgba(0,122,255,0.35) 70%, rgba(0,122,255,0) 85%)',
        opacity: p.opacity, // keep strong base visibility
        // wobble + path + distance:
        ['--dx']: `${p.dx}px`,
        ['--dy']: `${p.dy}px`,
        ['--driftX']: `${p.driftX}px`,
        ['--driftY']: `${p.driftY}px`,
        /* opacity no longer animated; only twinkle (scale) + drift */
        animation: `twinkle ${p.twinkleDur}s ease-in-out ${p.twinkleDelay}s infinite alternate, drift ${p.driftDur}s linear ${p.driftDelay}s infinite`,
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  );

  return (
    <div className="fixed inset-0 pointer-events-none particles-root" style={{ contain: 'paint layout style', transform: 'translateZ(0)' }}>
      <div className="particles-layer l0 absolute inset-0" style={{ willChange: 'transform', contain: 'paint', transform: 'translateZ(0)' }}>
        {layer0.map(renderStar)}
      </div>
      <div className="particles-layer l1 absolute inset-0" style={{ willChange: 'transform', contain: 'paint', transform: 'translateZ(0)' }}>
        {layer1.map(renderStar)}
      </div>
    </div>
  );
});

const Background = ({ children, starCount = 60, motion = 1.6 }) => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const rectRef = useRef({ left: 0, top: 0, width: 1, height: 1 });

  // Visibility boost factor for size
  const VIS_BOOST = 1.25;

  // Generate particles once. Motion is handled by CSS vars + keyframes.
  const { layer0, layer1 } = useMemo(() => {
    const total = Math.max(20, Math.floor(starCount));
    const cuts = Math.floor(total * 0.6);
    const layers = [
      { id: 0, count: cuts, sizeMin: 1 * VIS_BOOST, sizeMax: 3 * VIS_BOOST, speed: 1.0 },
      { id: 1, count: total - cuts, sizeMin: 0.9 * VIS_BOOST, sizeMax: 2.2 * VIS_BOOST, speed: 1.4 }, // slightly bigger small stars
    ];

    let id = 0;
    const out0 = [];
    const out1 = [];

    for (const layer of layers) {
      for (let i = 0; i < layer.count; i++) {
        const size = rand(layer.sizeMin, layer.sizeMax);
        const speed = layer.speed * motion;

        const particle = {
          id: id++,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size,
          // higher base opacity for visibility (no opacity animation now)
          opacity: 0.7 + Math.random() * 0.25,
          dx: (Math.random() - 0.5) * 6 * speed,
          dy: (Math.random() - 0.5) * 6 * speed,
          twinkleDur: rand(1.2, 2.4) / (0.9 + 0.4 * speed),
          twinkleDelay: Math.random() * 2,
          driftX: rand(60, 120) * (Math.random() < 0.5 ? -1 : 1) * speed,
          driftY: rand(60, 120) * (Math.random() < 0.5 ? -1 : 1) * speed,
          driftDur: rand(8, 16) / (0.8 + 0.5 * speed),
          driftDelay: Math.random() * 5,
        };

        (layer.id === 0 ? out0 : out1).push(particle);
      }
    }
    return { layer0: out0, layer1: out1 };
  }, [starCount, motion]);

  // Update CSS variables for parallax using rAF (no React state updates).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Cache rect and refresh on resize (avoids layout reads on every move)
    const updateRect = () => {
      const r = el.getBoundingClientRect();
      rectRef.current = { left: r.left, top: r.top, width: r.width || 1, height: r.height || 1 };
    };
    updateRect();
    const ro = new ResizeObserver(updateRect);
    ro.observe(el);

    let mx = 50;
    let my = 50;
    let ticking = false;

    const mm = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const reduced = !!mm?.matches;

    const onPointerMove = (e) => {
      if (reduced) return; // skip work entirely
      const rect = rectRef.current;
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

    const onVisibility = () => {
      // Pause CSS animations when tab hidden
      if (document.hidden) {
        el.classList.add('paused');
      } else {
        el.classList.remove('paused');
      }
    };

    el.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    onVisibility();

    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      ro.disconnect();
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

      {/* (Removed) mouse-follow glow */}

      <Particles layer0={layer0} layer1={layer1} />

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
