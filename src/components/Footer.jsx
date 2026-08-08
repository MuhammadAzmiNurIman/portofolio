import React from 'react';
import { portfolioData } from '../data/portfolioData';

export function Footer({ onOpenContact }) {
  const marqueeItems = [
    "Available for Freelance",
    "✦",
    "Built with Neobrutalism",
    "✦",
    "2024 Design Portfolio",
    "✦",
    "Available for Freelance",
    "✦",
    "Built with Neobrutalism",
    "✦",
    "2024 Design Portfolio",
    "✦"
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      url: portfolioData.profile.socials?.linkedin || "https://linkedin.com",
      hoverBg: "hover:bg-[#0A66C2]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      )
    },
    {
      name: "Instagram",
      url: portfolioData.profile.socials?.instagram || "https://instagram.com",
      hoverBg: "hover:bg-[#E4405F]",
      icon: (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )
    },
    {
      name: "Discord",
      url: portfolioData.profile.socials?.discord || "https://discord.com",
      hoverBg: "hover:bg-[#5865F2]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      )
    },
    {
      name: "GitHub",
      url: portfolioData.profile.socials?.github || "https://github.com",
      hoverBg: "hover:bg-black",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="w-full bg-[#0A192F] border-t-4 border-black mt-xl relative">
      {/* Top Infinite Marquee */}
      <div className="w-full bg-primary py-2.5 border-b-4 border-black overflow-hidden shadow-[0px_4px_0px_0px_#000]">
        <div className="animate-marquee inline-block text-white font-display text-sm md:text-base font-extrabold uppercase tracking-widest whitespace-nowrap">
          {marqueeItems.concat(marqueeItems).map((text, idx) => (
            <span key={idx} className="mx-4">{text}</span>
          ))}
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="w-full max-w-7xl mx-auto px-md py-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg items-stretch">

          {/* Card 1: Profile & Identity (5 cols) */}
          <div className="md:col-span-5 bg-white border-4 border-black p-md shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between gap-md relative">
            <div className="flex items-center gap-md">
              <div className="border-4 border-black p-0.5 bg-primary shadow-[3px_3px_0px_0px_#000] shrink-0">
                <img
                  alt="Profile Avatar"
                  className="w-14 h-14 object-cover border-2 border-black"
                  src={portfolioData.profile.avatarUrl}
                />
              </div>
              <div>
                <span className="inline-block bg-primary text-white font-display text-[10px] font-black uppercase px-2 py-0.5 border border-black shadow-[2px_2px_0px_0px_#000] mb-1">
                  PORTFOLIO LEAD
                </span>
                <h3 className="font-display font-black text-xl text-black uppercase tracking-tight">
                  {portfolioData.profile.name}
                </h3>
                <p className="font-body text-xs text-secondary font-bold">
                  {portfolioData.profile.title}
                </p>
              </div>
            </div>

            <div className="border-t-2 border-black pt-sm flex items-center justify-between text-xs font-display font-extrabold uppercase text-black/70">
              <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
              <span className="bg-[#A3E635] text-black border border-black px-2 py-0.5 font-mono text-[10px]">VER 2.0</span>
            </div>
          </div>

          {/* Card 2: Social Media Connect (4 cols) */}
          <div className="md:col-span-4 bg-white border-4 border-black p-md shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between gap-sm">
            <div className="flex items-center justify-between border-b-2 border-black pb-xs">
              <span className="font-display font-black uppercase text-xs tracking-wider text-black flex items-center gap-1.5">
                <span className="w-2 h-2 bg-primary inline-block border border-black"></span>
                SOCIAL CHANNELS
              </span>
              <span className="font-mono text-[10px] bg-primary-fixed border border-black px-1.5 py-0.5 font-bold">4 LINKS</span>
            </div>

            <div className="grid grid-cols-2 gap-2 my-auto">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 p-2 bg-background text-black border-2 border-black font-display font-extrabold text-xs uppercase shadow-[3px_3px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all ${social.hoverBg} hover:text-white group`}
                >
                  <span className="p-1 bg-white text-black border border-black group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                    {social.icon}
                  </span>
                  <span className="truncate">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Card 3: Actions & Quick Tools (3 cols) */}
          <div className="md:col-span-3 bg-white border-4 border-black p-md shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between gap-sm">
            <div className="flex items-center justify-between border-b-2 border-black pb-xs">
              <span className="font-display font-black uppercase text-xs tracking-wider text-black flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#A3E635] inline-block border border-black"></span>
                ACTIONS
              </span>
            </div>

            <div className="flex flex-col gap-2 my-auto">
              <button
                onClick={onOpenContact}
                className="w-full py-2 px-3 bg-primary text-white border-2 border-black shadow-[3px_3px_0px_0px_#000] font-display font-black text-xs uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-between"
              >
                <span>SEND MESSAGE</span>
                <span className="material-symbols-outlined text-base">mail</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: "Muhammad Azmi Portfolio", url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Portfolio URL copied to clipboard!");
                    }
                  }}
                  className="py-2 px-2 bg-white text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] font-display font-extrabold text-xs uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-1"
                  title="Share Portfolio"
                >
                  <span className="material-symbols-outlined text-base">share</span>
                  <span>SHARE</span>
                </button>

                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="py-2 px-2 bg-white text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] font-display font-extrabold text-xs uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-1"
                  title="Back to Top"
                >
                  <span className="material-symbols-outlined text-base">arrow_upward</span>
                  <span>TOP</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
