import React from 'react';
import { motion } from 'framer-motion';
import Background from '../components/Background';
import Mockup1 from '../assets/mockup1.png';
import Mockup7 from '../assets/mockup7.png';
import appstoredownload from '../assets/appstoredownload.svg';
import playstoredownload from '../assets/playstoredownload.svg';

const Home = () => {
  return (
    <Background>
      {/* Hero */}
      <section
        id="home"
        className="relative z-10 min-h-screen pt-16 sm:pt-20 md:pt-24 flex items-center justify-center scroll-mt-24"
      >
        {/* Ambient glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[12%] -translate-x-1/2 h-72 w-72 md:h-96 md:w-96 rounded-full bg-[#007AFF]/30 blur-[100px] opacity-60" />
          <div className="absolute right-[10%] bottom-[12%] h-60 w-60 md:h-80 md:w-80 rounded-full bg-white/5 blur-[80px]" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: copy + CTAs */}
            <div className="relative z-20 text-center lg:text-left">
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
                Measure your badminton smash speed offline with precision and ease. Track progress over time and
                sharpen your game with on-device AI analysis.
              </p>

              <div className="mt-8 flex flex-col items-center gap-2 lg:flex-row lg:items-stretch lg:justify-start">
                {/* App Store badge — use your SVG, consistent sizing */}
                <motion.a
                  href="https://apps.apple.com/app/6748543435"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Smashspeed on the App Store"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center shrink-0 rounded-xl p-0 border-0 outline-none ring-0 focus:outline-none focus:ring-0"
                >
                  <span className="block h-14 md:h-16">
                    <motion.img
                      src={appstoredownload}
                      alt="Download on the App Store"
                      loading="lazy"
                      className="block h-full w-auto border-0 outline-none ring-0 shadow-none bg-transparent"
                      style={{ height: '100%', width: 'auto' }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </span>
                </motion.a>

                {/* Google Play badge — use YOUR SVG, just larger */}
                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.astrangepotato.smashspeed"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get Smashspeed on Google Play"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center shrink-0 rounded-xl p-0 border-0 outline-none ring-0 focus:outline-none focus:ring-0"
                >
                  {/* Larger wrapper to counter tiny intrinsic artwork */}
                  <span className="block h-48 md:h-52">
                    <motion.img
                      src={playstoredownload}
                      alt="Get it on Google Play"
                      loading="lazy"
                      className="block h-full w-auto border-0 outline-none ring-0 shadow-none bg-transparent"
                      style={{ height: '100%', width: 'auto' }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </span>
                </motion.a>
              </div>

              {/* Small meta lines under buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-white/50 lg:justify-start">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  Offline • No cloud upload
                </div>
                <div className="hidden h-3 w-px bg-white/10 md:block" />
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-400" />
                  Calibrated for shuttle acoustics
                </div>
              </div>
            </div>

            {/* Right: mockups */}
            <div className="relative z-0 mt-10 sm:mt-12 lg:mt-0 lg:z-10">
              {/* layered glow frame */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -m-6 rounded-[2rem] bg-gradient-to-tr from-[#007AFF]/20 via-white/5 to-transparent blur-2xl"
              />
              <div className="relative mx-auto flex max-w-md items-end justify-center gap-6 lg:mx-0">
                <motion.div
                  className="relative md:-rotate-3 md:translate-y-4"
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
                  className="relative z-10 md:rotate-2 md:-translate-y-3"
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
    </Background>
  );
};

export default Home;
