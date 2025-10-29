import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
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
          <div className="flex flex-col lg:grid lg:items-center lg:gap-12 lg:grid-cols-2">
            {/* Left: copy + CTAs */}
            <div className="relative z-20 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/70 mt-8">
                <Award size={14} className="text-yellow-400" />
                #1 Taiwan App Store App
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

              {/* Mockups - shown on mobile between text and downloads */}
              <div className="relative z-0 mt-10 mb-8 lg:hidden">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -m-6 rounded-[2rem] bg-gradient-to-tr from-[#007AFF]/20 via-white/5 to-transparent blur-2xl"
                />
                <div className="relative mx-auto flex max-w-md items-end justify-center gap-6">
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
                      className="w-48 h-auto md:w-56 rounded-2xl shadow-2xl"
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
                      className="w-52 h-auto md:w-60 rounded-2xl shadow-2xl"
                      loading="lazy"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-3 rounded-3xl bg-white/5 blur-lg"
                    />
                  </motion.div>
                </div>
              </div>

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

            {/* Right: mockups - hidden on mobile, shown on desktop */}
            <div className="relative z-0 mt-10 sm:mt-12 lg:mt-0 lg:z-10 hidden lg:block">
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

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative mt-16 md:mt-24 mx-auto max-w-6xl"
          >
            {/* Card container with dark background */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl px-6 py-8 md:px-12 md:py-12 shadow-2xl border border-white/10">
              {/* Noise texture overlay */}
              <div
                className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat',
                }}
              />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#007AFF]/5 via-transparent to-purple-500/5 pointer-events-none" />

              {/* Decorative elements */}
              <div className="absolute top-8 right-8 h-32 w-32 rounded-full bg-[#007AFF]/10 blur-3xl pointer-events-none" />
              <div className="absolute bottom-8 left-8 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl pointer-events-none" />

              {/* Header */}
              <div className="relative text-center mb-8 md:mb-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                  Trusted by players worldwide
                </h2>
                <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto">
                  Join thousands of badminton players tracking their progress with precision
                </p>
              </div>

              {/* Stats Grid */}
              <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
                {/* Stat 1: Downloads */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-center group"
                >
                  <div className="relative inline-block mb-3">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                    40K+
                  </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-12 bg-gradient-to-r from-[#007AFF] to-blue-400 rounded-full" />
                  </div>
                  <div className="text-sm md:text-base font-semibold text-white/90 mb-1.5">
                    Users
                  </div>
                  <div className="text-xs md:text-sm text-white/50 leading-relaxed max-w-[200px] mx-auto">
                    Players worldwide trust Smashspeed
                  </div>
                </motion.div>

                {/* Stat 2: Countries */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center group"
                >
                  <div className="relative inline-block mb-3">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                    100+
                  </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-12 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full" />
                  </div>
                  <div className="text-sm md:text-base font-semibold text-white/90 mb-1.5">
                    Countries
                  </div>
                  <div className="text-xs md:text-sm text-white/50 leading-relaxed max-w-[200px] mx-auto">
                    Global badminton community
                  </div>
                </motion.div>

                {/* Stat 3: Social Reach */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center group"
                >
                  <div className="relative inline-block mb-3">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                    5M+
                  </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                  </div>
                  <div className="text-sm md:text-base font-semibold text-white/90 mb-1.5">
                    Social Reach
                  </div>
                  <div className="text-xs md:text-sm text-white/50 leading-relaxed max-w-[200px] mx-auto">
                    TikTok, Instagram & YouTube
                  </div>
                </motion.div>
              </div>

              {/* Bottom decorative line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>
    </Background>
  );
};

export default Home;
