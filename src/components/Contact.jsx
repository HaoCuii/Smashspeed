// src/pages/Contact.jsx
import React, { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Send,
  Instagram
} from 'lucide-react';
import emailjs from 'emailjs-com';
import Background from '../components/Background';

// Hard-coded EmailJS credentials:
const SERVICE_ID  = 'service_7hgbgzn';
const TEMPLATE_ID = 'template_mrdq00e';
const USER_ID     = 'eQjL4mxu-0_PftNDS';
emailjs.init(USER_ID);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      alert('Please fill out all fields.');
      return;
    }

    setLoading(true);
    setError(false);

    const templateParams = {
      name,
      time:    new Date().toLocaleString(),
      subject,
      email,
      message
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then(() => {
        setLoading(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch(err => {
        console.error('EmailJS error:', err);
        setLoading(false);
        setError(true);
      });
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      info: 'smashspeedapp@gmail.com',
      link: 'mailto:smashspeedapp@gmail.com',
      description: 'Send us an email anytime'
    },
    {
      icon: <Instagram size={24} />,
      title: 'Instagram',
      info: '@smashspeed_app',
      link: 'https://instagram.com/smashspeedai',
      description: 'Follow us on Instagram'
    }
  ];

  return (
    <Background>
      <section id="contact" className="relative z-10 py-20 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Have questions about Smashspeed? We'd love to hear from you.
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#007AFF]/20 via-[#007AFF]/30 to-[#007AFF]/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative bg-black/20 backdrop-blur-xl border border-[#007AFF]/20 rounded-2xl p-8 space-y-6">
                <h3 className="text-2xl font-semibold text-white">
                  Send us a message
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {['name','email'].map((field, i) => (
                    <div key={i}>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        placeholder={`Your ${field}`}
                        className="w-full px-4 py-3 bg-black/30 border border-[#007AFF]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF]/60 focus:ring-2 focus:ring-[#007AFF]/20 transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 bg-black/30 border border-[#007AFF]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF]/60 focus:ring-2 focus:ring-[#007AFF]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    placeholder="Tell us more..."
                    className="w-full px-4 py-3 bg-black/30 border border-[#007AFF]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF]/60 focus:ring-2 focus:ring-[#007AFF]/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full px-6 py-4 bg-[#007AFF] hover:bg-[#0056CC] text-white font-medium rounded-xl transition-transform hover:scale-105 shadow-lg disabled:opacity-50"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#007AFF] to-[#0056CC] rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="relative flex items-center justify-center gap-2">
                    <Send size={18} />
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  </div>
                </button>

                {submitted && (
                  <p className="text-green-400 mt-2">
                    Thanks! Your message has been sent.
                  </p>
                )}
                {error && (
                  <p className="text-red-400 mt-2">
                    Oops—something went wrong. Please try again later.
                  </p>
                )}
              </div>
            </form>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#007AFF]/20 via-[#007AFF]/30 to-[#007AFF]/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative bg-black/20 backdrop-blur-xl border border-[#007AFF]/20 rounded-2xl p-8 space-y-6">
                  <h3 className="text-2xl font-semibold text-white">
                    Contact Information
                  </h3>
                  {contactInfo.map((item, idx) => {
                    const external = item.link.startsWith('http');
                    return (
                      <div key={idx} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#007AFF]/20 to-[#007AFF]/40 rounded-xl flex items-center justify-center">
                          <div className="text-[#007AFF]">{item.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{item.title}</h4>
                          <a
                            href={item.link}
                            className="text-[#007AFF] font-medium hover:underline"
                            {...(external
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                          >
                            {item.info}
                          </a>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Background>
  );
};

export default Contact;
