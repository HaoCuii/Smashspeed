// src/pages/Home.jsx
import React from 'react';
import Background from '../components/Background';
import Mockup1 from '../assets/mockup1.png';
import Mockup2 from '../assets/mockup2.png';
import appstoredownload from '../assets/appstoredownload.svg';

const Home = () => (
  <Background>
    <section
      id="home"
      className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-20"
    >
      <div className="max-w-7xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Title & Subtext */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                Smashspeed
              </h1>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Measure your smash speed offline with precision and ease. Track your progress and improve your
                game with our AI-powered analysis tool.
              </p>
            </div>

            {/* App Store Download Button */}
            <div className="flex justify-center lg:justify-start">
              <a
                href="https://testflight.apple.com/join/MtMrsFye"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src={appstoredownload}
                  alt="Download on the App Store"
                  className="h-16"
                />
              </a>
            </div>
          </div>

          {/* Right Mockups */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Background glow effects */}
              <div className="absolute -inset-8 bg-gradient-to-r from-[#007AFF]/20 via-[#007AFF]/30 to-[#007AFF]/20 rounded-3xl blur-3xl opacity-50" />
              <div className="absolute -inset-4 bg-gradient-to-r from-[#007AFF]/25 to-[#007AFF]/15 rounded-2xl blur-xl opacity-40" />

              {/* Phone mockups container */}
              <div className="relative flex items-center gap-6">
                {/* First mockup - slightly behind and to the left */}
                <div className="relative transform -rotate-3 translate-y-4">
                  <div className="absolute bg-white/10 rounded-3xl " />
                  <img
                    src={Mockup1}
                    alt="Smashspeed app mockup 1"
                    className="relative w-48 md:w-56 lg:w-64 h-auto drop-shadow-2xl transition-transform duration-500 hover:scale-105 hover:-rotate-1"
                  />
                </div>

                {/* Second mockup - in front and to the right */}
                <div className="relative transform rotate-2 -translate-y-4 z-10">
                  <div className="absolute bg-white/15 rounded-3xl" />
                  <img
                    src={Mockup2}
                    alt="Smashspeed app mockup 2"
                    className="relative w-52 md:w-60 lg:w-72 h-auto drop-shadow-2xl transition-transform duration-500 hover:scale-105 hover:rotate-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Background>
);

export default Home;
