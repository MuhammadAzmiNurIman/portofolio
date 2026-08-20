import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { getBotReply, chatbotQuickReplies, chatbotGreeting } from '../data/chatbotData';

function createMessage(role, text, action) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
    action: action || null,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

export function ChatbotWidget({ onOpenContact, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Initialize greeting on first load
  useEffect(() => {
    if (!hasInteracted) {
      setMessages([createMessage('bot', chatbotGreeting.text)]);
      setHasInteracted(true);
    }
  }, [hasInteracted]);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, typing, open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        if (inputRef.current && window.innerWidth >= 640) {
          inputRef.current.focus();
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const sendMessage = (rawText) => {
    const text = (rawText || '').trim();
    if (!text || typing) return;

    setMessages((prev) => [...prev, createMessage('user', text)]);
    setInput('');
    setTyping(true);

    const reply = getBotReply(text);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        createMessage('bot', reply.text, reply.action || null),
      ]);
      setTyping(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleReset = () => {
    setMessages([
      createMessage(
        'bot',
        `Conversation reset! 👋 Is there anything you want to ask about ${portfolioData.profile.name} again?`
      ),
    ]);
  };

  const handleActionClick = (action) => {
    if (action === 'contact') {
      if (onOpenContact) onOpenContact();
    } else if (action === 'projects') {
      if (onNavigate) onNavigate('projects');
    } else if (action === 'about') {
      if (onNavigate) onNavigate('about');
    }
  };

  return (
    <>
      {/* Floating Launcher Button (Only visible when chat is closed) */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] select-none"
          >
            <motion.button
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Open assistant chatbot"
              className="w-14 h-14 bg-primary text-white border-3 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined font-bold text-3xl">
                chat
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Neo-Brutalist Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-x-3 bottom-4 sm:inset-x-auto sm:bottom-6 sm:right-6 z-[60] w-[calc(100vw-1.5rem)] sm:w-[380px] max-w-[390px] h-[min(540px,calc(100dvh-2.5rem))] bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col overflow-hidden mx-auto sm:mx-0"
          >
            {/* Neo-Brutalist Header */}
            <div className="bg-primary text-white border-b-4 border-black p-3 flex items-center justify-between gap-2 select-none">
              {/* Identity info */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 bg-white border-2 border-black p-0.5 overflow-hidden shrink-0 shadow-[2px_2px_0px_0px_#000]">
                  <img
                    src={portfolioData.profile.avatarUrl}
                    alt="Azmi AI"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-extrabold text-xs sm:text-sm uppercase tracking-wide truncate">
                      AZMI AI
                    </h3>
                    <span className="bg-primary-fixed text-black border border-black px-1.5 py-0.2 font-display text-[9px] font-extrabold uppercase shadow-[1px_1px_0px_0px_#000]">
                      BOT
                    </span>
                  </div>
                  <p className="font-body text-[11px] text-white/80 truncate">
                    Portfolio Assistant
                  </p>
                </div>
              </div>

              {/* Controls: Reset and ONLY ONE Close Button */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Reset button */}
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset chat"
                  title="Reset conversation"
                  className="bg-white hover:bg-neutral-100 text-black border-2 border-black w-8 h-8 flex items-center justify-center shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base font-bold">restart_alt</span>
                </button>

                {/* THE ONLY Close Button */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chatbot"
                  title="Close Chatbot"
                  className="bg-white hover:bg-black hover:text-white text-black border-2 border-black w-8 h-8 flex items-center justify-center shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:scale-95 transition-all cursor-pointer font-display font-black"
                >
                  <span className="material-symbols-outlined text-lg font-black">close</span>
                </button>
              </div>
            </div>

            {/* Neo-Brutalist Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto bg-surface p-3 flex flex-col gap-3 min-h-0 overscroll-contain"
            >
              {messages.map((message) => {
                const isUser = message.role === 'user';
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="font-display font-extrabold text-[9px] uppercase text-black/60">
                        {isUser ? 'YOU' : '✦ AZMI BOT'}
                      </span>
                      <span className="text-[9px] font-body text-neutral-400">
                        {message.time}
                      </span>
                    </div>

                    {/* Speech Bubble */}
                    <div
                      className={`max-w-[88%] px-3.5 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] font-body text-xs sm:text-[13px] leading-relaxed whitespace-pre-line break-words ${
                        isUser
                          ? 'bg-primary text-white'
                          : 'bg-white text-black'
                      }`}
                    >
                      {message.text}
                    </div>

                    {/* Interactive CTAs */}
                    {!isUser && message.action && (
                      <div className="mt-2 flex flex-wrap gap-1.5 max-w-[88%]">
                        {message.action === 'contact' && (
                          <button
                            type="button"
                            onClick={() => handleActionClick('contact')}
                            className="bg-primary text-white border-2 border-black px-3 py-1.5 font-display font-extrabold text-[11px] uppercase shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-xs">mail</span>
                            Open Contact Form
                          </button>
                        )}

                        {message.action === 'projects' && (
                          <button
                            type="button"
                            onClick={() => handleActionClick('projects')}
                            className="bg-primary text-white border-2 border-black px-3 py-1.5 font-display font-extrabold text-[11px] uppercase shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-xs">code</span>
                            View All Projects
                          </button>
                        )}

                        {message.action === 'about' && (
                          <button
                            type="button"
                            onClick={() => handleActionClick('about')}
                            className="bg-white text-black border-2 border-black px-3 py-1.5 font-display font-extrabold text-[11px] uppercase shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-xs">person</span>
                            Full Profile
                          </button>
                        )}

                        {message.action === 'socials' && (
                          <div className="flex flex-wrap gap-1.5">
                            {portfolioData.profile.socials?.github && (
                              <a
                                href={portfolioData.profile.socials.github}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-white text-black border-2 border-black px-2.5 py-1 font-display font-bold text-[10px] uppercase shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center gap-1"
                              >
                                ↗ GitHub
                              </a>
                            )}
                            {portfolioData.profile.socials?.linkedin && (
                              <a
                                href={portfolioData.profile.socials.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-white text-black border-2 border-black px-2.5 py-1 font-display font-bold text-[10px] uppercase shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center gap-1"
                              >
                                ↗ LinkedIn
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Bot Typing Indicator */}
              {typing && (
                <div className="flex items-start">
                  <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] px-3.5 py-2 flex items-center gap-1.5">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: `${dot * 0.15}s` }}
                      ></span>
                    ))}
                    <span className="font-display text-[9px] font-extrabold uppercase text-black/60 ml-0.5">
                      Typing...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Neo-Brutalist Topic Chips Strip */}
            <div className="bg-surface-container border-t-2 border-black px-2.5 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {chatbotQuickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => sendMessage(reply)}
                  disabled={typing}
                  className="bg-white hover:bg-primary-fixed active:bg-primary-fixed text-black border-2 border-black px-2.5 py-1 font-display font-extrabold text-[10px] sm:text-[11px] uppercase whitespace-nowrap shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Neo-Brutalist Input Form */}
            <form
              onSubmit={handleSubmit}
              className="border-t-4 border-black p-2.5 sm:p-3 flex items-center gap-2 bg-white"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message or question..."
                disabled={typing}
                className="flex-1 bg-surface border-2 border-black px-3 py-2 font-body text-xs sm:text-sm text-black placeholder:text-neutral-500 shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:bg-primary-fixed transition-all min-w-0 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="w-10 h-10 bg-primary text-white border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:scale-95 transition-all flex items-center justify-center cursor-pointer shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined font-bold text-lg sm:text-xl">send</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatbotWidget;