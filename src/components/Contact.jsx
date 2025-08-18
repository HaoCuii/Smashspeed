import React, { useMemo, useState, useEffect } from "react";
import { Mail, Send, Instagram, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import Background from "../components/Background";

/**
 * Contact Page — Visual Revamp
 * - Layered glass panels, floating labels, animated sheen button, timeline contact info
 * - Toast notifications, bot honeypot, environment-agnostic EmailJS config
 */

// Safe env getter for Vite (import.meta.env) and CRA/Next (process.env)
// Replace the old getEnv function with this:
const getEnv = (key, fallback = "") => {
  // For Vite
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  // For CRA / Next.js
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key];
  }
  return fallback;
};

const SERVICE_ID = getEnv("VITE_EMAILJS_SERVICE_ID", getEnv("REACT_APP_EMAILJS_SERVICE_ID"));
const TEMPLATE_ID = getEnv("VITE_EMAILJS_TEMPLATE_ID", getEnv("REACT_APP_EMAILJS_TEMPLATE_ID"));
const PUBLIC_KEY  = getEnv("VITE_EMAILJS_PUBLIC_KEY",  getEnv("REACT_APP_EMAILJS_PUBLIC_KEY"));

const EMAIL_REGEX = /^(?=.{5,254}$)[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Simple toast system ---------------------------------------------
const useToasts = () => {
  const [toasts, setToasts] = useState([]);
  const push = (toast) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, ...toast }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, toast.duration ?? 4000);
  };
  return { toasts, push };
};

const Toasts = ({ toasts }) => (
  <div className="pointer-events-none fixed top-4 right-4 z-[100] space-y-3">
    {toasts.map((t) => (
      <motion.div
        key={t.id}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className={`pointer-events-auto flex items-start gap-3 rounded-xl px-4 py-3 shadow-xl backdrop-blur-md border ${
          t.type === "success"
            ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-200"
            : "bg-red-500/10 border-red-400/30 text-red-200"
        }`}
      >
        {t.type === "success" ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
        <div className="text-sm leading-snug">{t.message}</div>
      </motion.div>
    ))}
  </div>
);

// Fancy button sheen ------------------------------------------------
const SheenButton = ({ loading, children }) => (
  <button
    type="submit"
    disabled={loading}
    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#0A84FF] to-[#0066FF] px-6 py-4 font-medium text-white shadow-lg transition-transform hover:scale-[1.02] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
    aria-busy={loading}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      <Send size={18} />
      {loading ? "Sending..." : children}
    </span>
    {/* sheen sweep */}
    <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-[120%] group-hover:opacity-100" />
  </button>
);

// Floating label input ---------------------------------------------
const Field = ({ id, label, type = "text", value, onChange, ...props }) => (
  <div className="relative">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="peer w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder-transparent backdrop-blur-sm outline-none transition focus:border-[#0A84FF]/60 focus:ring-2 focus:ring-[#0A84FF]/20"
      {...props}
    />
    <label
      htmlFor={id}
      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-transparent px-1 text-gray-400 transition-all
                 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#9ecbff] peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs"
    >
      {label}
    </label>
  </div>
);

const TextArea = ({ id, label, value, onChange, ...props }) => (
  <div className="relative">
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="peer w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder-transparent backdrop-blur-sm outline-none transition focus:border-[#0A84FF]/60 focus:ring-2 focus:ring-[#0A84FF]/20"
      {...props}
    />
    <label
      htmlFor={id}
      className="pointer-events-none absolute left-3 top-4 bg-transparent px-1 text-gray-400 transition-all
                 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#9ecbff] peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs"
    >
      {label}
    </label>
  </div>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", company: "" }); // company = honeypot
  const [loading, setLoading] = useState(false);
  const { toasts, push } = useToasts();

  const canSubmit = useMemo(() => {
    const { name, email, subject, message, company } = form;
    return (
      !loading &&
      name.trim().length >= 2 &&
      EMAIL_REGEX.test(email) &&
      subject.trim().length >= 3 &&
      message.trim().length >= 10 &&
      company.trim() === ""
    );
  }, [form, loading]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      push({ type: "error", message: "Email service misconfigured. Try again later." });
      return;
    }
    setLoading(true);

    const params = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
      time: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY });
      push({ type: "success", message: "Thanks! Your message has been sent." });
      setForm({ name: "", email: "", subject: "", message: "", company: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      push({ type: "error", message: "Oops—something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={18} />,
      title: "Email",
      info: "smashspeedai@gmail.com",
      link: "mailto:smashspeedai@gmail.com",
      description: "Send us an email anytime",
    },
    {
      icon: <Instagram size={18} />,
      title: "Instagram",
      info: "@smashspeedai",
      link: "https://instagram.com/smashspeedai",
      description: "Follow us on Instagram",
    },
  ];


  return (
    <Background>
      <section id="contact" className="relative z-10 min-h-screen px-4 py-24">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-14 text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
              <Sparkles size={14} /> We reply fast
            </div>
            <h2 className="mb-3 text-4xl font-bold text-white md:text-5xl">Let’s build something great</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Questions, partnerships, media—drop us a line and we’ll get back to you.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left: Form Card */}
            <motion.form
              onSubmit={onSubmit}
              noValidate
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              aria-labelledby="contactFormTitle"
            >


              <h3 id="contactFormTitle" className="mb-6 text-2xl font-semibold text-white">Send us a message</h3>

              {/* Honeypot */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" value={form.company} onChange={onChange} tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field id="name" label="Your name" name="name" value={form.name} onChange={onChange} required maxLength={80} />
                <Field id="email" label="Email address" name="email" type="email" value={form.email} onChange={onChange} required inputMode="email" />
              </div>

              <div className="mt-6">
                <Field id="subject" label="Subject" name="subject" value={form.subject} onChange={onChange} required maxLength={120} />
              </div>

              <div className="mt-6">
                <TextArea id="message" label="Message" name="message" rows={6} value={form.message} onChange={onChange} required maxLength={2000} />
                <div className="mt-2 text-right text-xs text-gray-500" aria-live="polite">{form.message.length}/2000</div>
              </div>

              <div className="mt-7">
                <SheenButton loading={loading || !canSubmit}>{!canSubmit && !loading ? "Complete the form" : "Send Message"}</SheenButton>
              </div>

              <p className="mt-3 text-center text-xs text-gray-500">We’ll never share your info.</p>
            </motion.form>

            {/* Right: Contact timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8 backdrop-blur-xl"
            >
              <h3 className="mb-6 text-2xl font-semibold text-white">Contact Information</h3>

              <div className="relative ml-4 space-y-8 before:absolute before:left-[-26px] before:top-1 before:h-[calc(100%-0.5rem)] before:w-[2px] before:bg-gradient-to-b before:from-[#0A84FF]/60 before:to-transparent">
                {contactInfo.map((item, idx) => (
                  <div key={idx} className="relative flex gap-4">
                    <div className="absolute -left-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#0A84FF]/20 text-[#0A84FF] shadow-[0_0_0_4px_rgba(10,132,255,0.08)]">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-white">{item.title}</div>
                      <a href={item.link} className="inline-flex items-center gap-1 text-[#9ecbff] hover:text-white hover:underline" target={item.link.startsWith("http") ? "_blank" : undefined} rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}>
                        {item.info} <ArrowRight size={14} />
                      </a>
                      <div className="text-sm text-gray-400">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3">
                <a
                  href="mailto:smashspeedai@gmail.com"
                  className="group rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-sm text-white/90 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
                >
                  Email us directly
                </a>
                <a
                  href="https://instagram.com/smashspeedai" target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
                >
                  <Instagram size={16} /> <span>@smashspeedai</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Toasts */}
        <Toasts toasts={toasts} />
      </section>
    </Background>
  );
};

export default Contact;
