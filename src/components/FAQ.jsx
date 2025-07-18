// src/components/FAQ.jsx
import React from 'react';
import Background from './Background';

const faqData = [
  {
    question: 'What is Smashspeed?',
    answer: 'Smashspeed is an AI-powered app that tracks your smash speed in real time and delivers instant insights and stats to help you elevate your game.'
  },
  {
    question: 'How do I download and install Smashspeed?',
    answer: "Just tap the “Download Now” button on our homepage or search for “Smashspeed” in the App Store on your iPhone, iPad, or Mac."
  },
  {
    question: 'What operating systems does Smashspeed support?',
    answer: 'Smashspeed works on any Apple iOS device, including iPhone, iPad, and MacBook.'
  },
  {
    question: 'Is Smashspeed free to use?',
    answer: 'Yes—Smashspeed is completely free. There are no premium tiers or hidden fees.'
  },
  {
    question: 'How does Smashspeed improve my performance?',
    answer: 'By giving you live feedback and detailed analytics on your smash speed, Smashspeed helps you pinpoint areas to work on and track your progress over time.'
  },
  {
    question: 'Is my data safe with Smashspeed?',
    answer: 'We take your privacy seriously. Your videos are used only to train our AI models and are never viewed by humans.'
  }
];

const FAQ = () => (
  <Background>
    <section id="faq" className="relative z-10 py-10 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about Smashspeed and how it can help elevate your smash-speed training.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faqData.map((faq, idx) => (
            <div key={idx} className="h-full">
              {/* Lighter glass-morphism panel */}
              <div className="relative rounded-[20px] bg-white/10 backdrop-blur-lg overflow-hidden shadow-black/5 shadow-lg h-full">
                {/* subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-white/10 to-transparent" />
                {/* thin white border */}
                <div className="absolute inset-0 rounded-[20px] border border-white/20" />

                {/* content */}
                <div className="relative p-6 flex flex-col h-full">
                  <h3 className="text-gray-100 font-medium text-lg md:text-xl mb-4 leading-relaxed">
                    {faq.question}
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed flex-grow">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terms & Privacy links */}
        <div className="mt-12 text-center">
          <a
            href="/terms-of-service"
            className="text-gray-400 hover:text-white mx-4 text-sm"
          >
            Terms of Service
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="/privacy-policy"
            className="text-gray-400 hover:text-white mx-4 text-sm"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </section>
  </Background>
);

export default FAQ;
