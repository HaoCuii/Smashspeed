import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Background from '../components/Background';
import Mockup1 from '../assets/mockup1.png';
import Mockup7 from '../assets/mockup7.png';
import appstoredownload from '../assets/appstoredownload.svg';
import Smashspeed from '../assets/Smashspeed (2).mp4'; // consider renaming to Smashspeed.mp4 to avoid special chars

const Home = () => {
  const videoRef = useRef(null);

  // Gentle, resilient autoplay + pause when out of view (respects reduced motion)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tryPlay = () => video.play().catch(() => { /* ignore autoplay block */ });

    if (!prefersReduced) {
      // Initial attempt
      if (video.muted) tryPlay();

      // Play/pause when visible
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            video.pause();
          }
        },
        { threshold: 0.25 }
      );
      io.observe(video);

      // Recover after tab visibility changes
      const onVisibility = () => {
        if (!document.hidden) tryPlay();
      };
      document.addEventListener('visibilitychange', onVisibility);

      return () => {
        io.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
      };
    }
  }, []);

  return (
    <Background>
      {/* Hero */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex items-center justify-center scroll-mt-24"
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 top-[12%] -translate-x-1/2 h-72 w-72 md:h-96 md:w-96 rounded-full bg-[#007AFF]/30 blur-[100px] opacity-60" />
          <div className="absolute right-[10%] bottom-[12%] h-60 w-60 md:h-80 md:w-80 rounded-full bg-white/5 blur-[80px]" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: copy + CTA */}
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-white/70">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#007AFF]" />
                AI-powered smash speed
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                  Smashspeed
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                Measure your badminton smash speed offline with precision and ease. Track progress over time and sharpen your game with on-device AI analysis.
              </p>

              <div className="mt-8 flex justify-center lg:justify-start">
                <motion.a
                  href="https://apps.apple.com/app/6748543435"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Smashspeed on the App Store"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center rounded-xl bg-white/5 p-2 backdrop-blur transition-all hover:bg-white/10 shadow-lg"
                >
                  <motion.img
                    src={appstoredownload}
                    alt="Download on the App Store"
                    loading="lazy"
                    width={180}
                    height={54}
                    className="h-14 md:h-16"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </motion.a>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-white/50 lg:justify-start">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  Offline • No cloud upload
                </div>
                <div className="hidden h-3 w-px bg-white/10 md:block" />
                <div className="hidden items-center gap-2 md:flex">
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-400" />
                  Calibrated for shuttle acoustics
                </div>
              </div>
            </div>

            {/* Right: mockups */}
            <div className="relative">
              {/* layered glow frame */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -m-6 rounded-[2rem] bg-gradient-to-tr from-[#007AFF]/20 via-white/5 to-transparent blur-2xl"
              />
              <div className="relative mx-auto flex max-w-md items-end justify-center gap-6 lg:mx-0">
                <motion.div
                  className="relative -rotate-3 translate-y-4"
                  whileHover={{ rotate: -1, scale: 1.02 }}
                  initial={{ y: 16, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                >
                  <img
                    src={Mockup1}
                    alt="Smashspeed app capture screen"
                    className="w-48 h-auto md:w-56 lg:w-64 rounded-2xl shadow-2xl"
                    loading="lazy"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-3 rounded-3xl bg-[#007AFF]/10 blur-xl"
                  />
                </motion.div>

                <motion.div
                  className="relative z-10 rotate-2 -translate-y-3"
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  initial={{ y: -16, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.05 }}
                >
                  <img
                    src={Mockup7}
                    alt="Smashspeed app speed results"
                    className="w-52 h-auto md:w-60 lg:w-72 rounded-2xl shadow-2xl"
                    loading="lazy"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-3 rounded-3xl bg-white/5 blur-lg"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video section */}
      <section className="relative z-10 px-4 pb-16 pt-6 md:px-6">
        <div className="mx-auto w-full max-w-5xl">
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
            {/* subtle inner glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"
            />
            <video
              ref={videoRef}
              src={Smashspeed}
              controls
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full rounded-xl shadow-xl"
            />
          </div>
          <p className="mt-3 text-center text-xs text-white/50">
            Demo recorded on-device. Autoplay may vary by browser settings.
          </p>
        </div>
      </section>
    </Background>
  );
};

export default Home;
