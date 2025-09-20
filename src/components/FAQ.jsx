import React, { useEffect, useId, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Background from "./Background";
import { ChevronDown } from "lucide-react";

const faqData = [
  { question: "What is Smashspeed?", answer: "Smashspeed is an AI-powered app that tracks your smash speed in real time and delivers instant insights and stats to help you elevate your game." },
  { question: "How do I download and install Smashspeed?", answer: "Just tap the “Download Now” button on our homepage or search for “Smashspeed” in the App Store or Google Playstore on your device." },
  { question: "What operating systems does Smashspeed support?", answer: "Smashspeed works on any Apple iOS device, or Android device." },
  { question: "Is Smashspeed free to use?", answer: "Yes—Smashspeed is completely free. There are no premium tiers or hidden fees." },
  { question: "Does it work offline?", answer: "Absolutely. Smashspeed processes all smash-speed measurements right on your device—no internet connection required—so you can train anywhere, even when you’re offline." },
  { question: "Is my data safe with Smashspeed?", answer: "We take your privacy seriously. Your videos are used only to train our AI models and are never viewed by humans." },
];

function useHashOpen(setOpenIndex) {
  useEffect(() => {
    const openFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace("#", ""));
      if (!hash) return;
      const idx = faqData.findIndex((f) => f.question.toLowerCase() === hash.toLowerCase());
      if (idx >= 0) setOpenIndex(idx);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [setOpenIndex]);
}

const FAQItem = ({ i, q, a, isOpen, onToggle }) => {
  const buttonId = useId();
  const panelId = `${buttonId}-panel`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl bg-white/5 backdrop-blur-md"
    >
      {/* soft gradient ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 [mask-image:linear-gradient(black,transparent)]" />

      {/* active accent line */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.span
            layoutId="faq-accent"
            className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl bg-[#007AFF]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left md:px-6 md:py-5"
      >
        <span className="text-base md:text-lg font-medium text-white/90">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-white/70"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="overflow-hidden px-5 pb-5 md:px-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <p className="text-sm leading-relaxed text-white/75">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null); // single-open behavior
  useHashOpen(setOpenIndex);

  const structured = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <Background>
      <section id="faq" className="relative z-10 px-4 py-16 md:py-20">

        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
              FAQ • Quick answers
            </div>
            <h2 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent text-4xl font-bold md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-white/60 md:text-lg">
              Short, clear answers about Smashspeed and how it helps your training.
            </p>
          </div>

          {/* Accordion grid */}
          <LayoutGroup>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {faqData.map(({ question, answer }, i) => (
                <FAQItem
                  key={`${i}-${question}`}
                  i={i}
                  q={question}
                  a={answer}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </LayoutGroup>

          {/* Footer links */}
          <div className="mt-10 text-center">
            <a href="/terms-of-service" className="mx-4 text-sm text-white/60 hover:text-white">
              Terms of Service
            </a>
            <span className="text-white/20">|</span>
            <a href="/privacy-policy" className="mx-4 text-sm text-white/60 hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* JSON-LD for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />
      </section>
    </Background>
  );
};

export default FAQ;
