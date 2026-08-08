import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('message', formData.message);
      payload.append('_captcha', 'false');
      payload.append('_template', 'table');
      payload.append('_subject', `New Portfolio Message from ${formData.name}`);

      const response = await fetch("https://formsubmit.co/ajax/muhammad.azmi.iman@gmail.com", {
        method: "POST",
        headers: {
          'Accept': 'application/json'
        },
        body: payload
      });

      const data = await response.json();

      if (response.ok && data.success !== "false") {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3500);
      } else {
        throw new Error(data.message || 'Failed to submit form');
      }
    } catch (err) {
      console.error("Form submit error, using native fallback:", err);
      triggerNativeFallback();
    } finally {
      setLoading(false);
    }
  };

  const triggerNativeFallback = () => {
    const form = document.getElementById('native_contact_form');
    if (form) {
      form.submit();
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3500);
    } else {
      setError('Failed to send message. Please try again later.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <iframe 
          name="formsubmit_iframe" 
          id="formsubmit_iframe" 
          className="hidden"
          style={{ display: 'none' }}
        />

        {/* Hidden native form for fallback */}
        <form 
          id="native_contact_form"
          action="https://formsubmit.co/muhammad.azmi.iman@gmail.com" 
          method="POST" 
          target="formsubmit_iframe" 
          className="hidden"
          style={{ display: 'none' }}
        >
          <input type="hidden" name="name" value={formData.name} />
          <input type="hidden" name="email" value={formData.email} />
          <input type="hidden" name="message" value={formData.message} />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_subject" value={`New Portfolio Message from ${formData.name}`} />
        </form>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white border-4 border-black p-6 md:p-8 w-full max-w-lg shadow-[10px_10px_0px_0px_#00327d] relative"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            disabled={loading}
            className="absolute top-4 right-4 bg-primary text-white border-2 border-black p-1 shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all disabled:opacity-50"
          >
            <span className="material-symbols-outlined font-bold">close</span>
          </button>

          <div className="inline-block bg-primary text-white border-2 border-black px-3 py-1 mb-3 shadow-[3px_3px_0px_0px_#000] transform -rotate-1">
            <span className="font-display font-bold uppercase text-xs tracking-widest">Get In Touch</span>
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-extrabold uppercase text-black mb-4">
            LET'S WORK TOGETHER
          </h2>

          {submitted ? (
            <div className="bg-primary-fixed border-4 border-black p-6 text-center my-4 shadow-[4px_4px_0px_0px_#000]">
              <span className="material-symbols-outlined text-4xl text-primary mb-2">check_circle</span>
              <p className="font-display font-bold text-lg uppercase text-black">Message Transmitted!</p>
              <p className="font-body text-sm text-black/80 mt-1">
                Thank you! Azmi will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="bg-red-100 border-2 border-red-600 text-red-700 p-3 text-xs font-bold font-body">
                  {error}
                </div>
              )}

              <div>
                <label className="block font-display text-sm font-bold uppercase mb-1">Your Name</label>
                <input 
                  required
                  type="text"
                  placeholder="JOHN DOE"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={loading}
                  className="w-full bg-surface border-4 border-black px-4 py-2 font-body shadow-[4px_4px_0px_0px_#000] focus:outline-none focus:bg-primary-fixed transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block font-display text-sm font-bold uppercase mb-1">Your Email</label>
                <input 
                  required
                  type="email"
                  placeholder="JOHN@EXAMPLE.COM"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading}
                  className="w-full bg-surface border-4 border-black px-4 py-2 font-body shadow-[4px_4px_0px_0px_#000] focus:outline-none focus:bg-primary-fixed transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block font-display text-sm font-bold uppercase mb-1">Project Details</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="TELL ME ABOUT YOUR PROJECT REQUIREMENTS..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={loading}
                  className="w-full bg-surface border-4 border-black px-4 py-2 font-body shadow-[4px_4px_0px_0px_#000] focus:outline-none focus:bg-primary-fixed transition-colors disabled:opacity-50"
                />
              </div>

              <motion.button 
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                type="submit"
                disabled={loading}
                className="mt-2 bg-primary text-white font-display font-extrabold text-base uppercase px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    SENDING... <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  </>
                ) : (
                  <>
                    SEND MESSAGE <span className="material-symbols-outlined">send</span>
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
