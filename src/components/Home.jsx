// src/pages/Home.jsx
import React from 'react';
import { Download } from 'lucide-react';
import Background from '../components/Background';
import Image from '../assets/Frame_14.png';

const Home = () => (
  <Background>
    <section
      id="home"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20"
    >
      {/* Title & Subtext */}
      <div className="text-center mb-8 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Smashspeed
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed max-w-lg mx-auto">
          Measure your smash speed with precision and ease. Track your progress and improve your
          game with our intuitive app.
        </p>
      </div>

      {/* Download Button */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <a
          href="https://testflight.apple.com/join/MtMrsFye"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-6 py-3 bg-[#007AFF] hover:bg-[#0056CC] text-white rounded-full transition-transform hover:scale-105 shadow-lg inline-flex items-center"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#007AFF] to-[#0056CC] rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="relative flex items-center gap-2">
            <Download size={18} />
            <span>Download Beta Version</span>
          </div>
        </a>
      </div>

      {/* Glowing Preview Image */}
      <div className="relative group w-full max-w-6xl pb-10">
        {/* Outer glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#007AFF]/20 via-[#007AFF]/30 to-[#007AFF]/20 rounded-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        {/* Inner glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-[#007AFF]/30 to-[#007AFF]/20 rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Glass panel */}
        <div className="relative rounded-[20px] bg-white/10 backdrop-blur-xl overflow-hidden border border-white/20 shadow-black/5 shadow-lg">
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-white/5 to-transparent" />
          {/* stroke border */}
          <div className="absolute inset-0 rounded-[20px] border border-white/20" />
          {/* image */}
          <img
            src={Image}
            alt="Smashspeed preview"
            className="relative w-full h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </section>
  </Background>
);

export default Home;
