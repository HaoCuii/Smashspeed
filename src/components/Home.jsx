import React, { useEffect, useRef } from 'react';
import Background from '../components/Background';
import Mockup1 from '../assets/mockup1.png';
import Mockup7 from '../assets/mockup7.png';
import appstoredownload from '../assets/appstoredownload.svg';
import Smashspeed from '../assets/Smashspeed (2).mp4'; // Recommend renaming to remove spaces/parentheses

const Home = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Autoplay was prevented:', error);
        });
      }
    }
  }, []);

  return (
    <Background>
      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-20"
      >
        <div className="max-w-7xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                  Smashspeed
                </h1>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Measure your smash speed offline with precision and ease. Track your progress and improve your
                  game with our AI-powered analysis tool.
                </p>
              </div>

              {/* Buttons Row */}
              <div className="flex justify-center lg:justify-start items-center gap-4">
                {/* App Store Button */}
                <a
                  href="https://apps.apple.com/app/6748543435"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                  style={{ width: 220 }} // consistent width
                >
                  <img
                    src={appstoredownload}
                    alt="Download on the App Store"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </a>

                {/* Product Hunt Badge */}
                <a
                  href="https://www.producthunt.com/products/smashspeed?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-smashspeed"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: 325 }} // same width as App Store button
                >
                  <img
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=999264&theme=light&t=1753980327224"
                    alt="Smashspeed - Badminton Smash Speed Tracker | Product Hunt"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </a>
              </div>

            </div>

            {/* Right Mockups */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-[#007AFF]/20 via-[#007AFF]/30 to-[#007AFF]/20 rounded-3xl blur-3xl opacity-50" />
                <div className="absolute -inset-4 bg-gradient-to-r from-[#007AFF]/25 to-[#007AFF]/15 rounded-2xl blur-xl opacity-40" />
                <div className="relative flex items-center gap-6">
                  <div className="relative transform -rotate-3 translate-y-4">
                    <img
                      src={Mockup1}
                      alt="Smashspeed app mockup 1"
                      className="relative w-48 md:w-56 lg:w-64 h-auto drop-shadow-2xl transition-transform duration-500 hover:scale-105 hover:-rotate-1"
                    />
                  </div>
                  <div className="relative transform rotate-2 -translate-y-4 z-10">
                    <img
                      src={Mockup7}
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

      {/* Video Section Below */}
      <div className="relative z-10 py-12 px-4 flex justify-center">
        <div className="max-w-4xl w-full">
          <video
            ref={videoRef}
            src={Smashspeed}
            controls
            muted
            loop
            playsInline
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </Background>
  );
};

export default Home;
  