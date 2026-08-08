import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export function HomePage({ onNavigate, onOpenContact, onSelectProject }) {
  const { profile, projects } = portfolioData;
  const featuredProjects = projects.slice(0, 2);

  return (
    <div className="flex flex-col w-full">
      {/* Train Window Hero Section */}
      <section className="relative w-full min-h-[90vh] md:min-h-[92vh] py-md md:py-16 flex flex-col justify-center items-center p-md md:p-xl overflow-hidden z-10">
        {/* Train Window Video Background */}
        <div className="absolute inset-0 z-0 p-sm md:p-lg">
          <div className="w-full h-full border-4 border-black shadow-[8px_8px_0px_0px_#000000] relative overflow-hidden bg-black">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src="/hero.mp4"
            />
            <div className="absolute inset-0 bg-primary/30 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/20 to-transparent"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center gap-lg mt-8 md:mt-12 w-full max-w-5xl mx-auto px-4">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-display text-[48px] sm:text-[64px] md:text-[110px] leading-[0.9] text-white uppercase tracking-tighter text-stroke-black text-shadow-black"
          >
            HI! I AM<br />MUHAMMAD AZMI
          </motion.h1>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-primary-fixed border-4 border-black px-md md:px-xl py-sm shadow-[6px_6px_0px_0px_#000000] transform -rotate-2 hover:rotate-0 transition-transform cursor-pointer"
          >
            <p className="font-headline text-base sm:text-xl md:text-2xl text-black font-extrabold uppercase tracking-tight">
              {profile.title}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-md mt-4"
          >
            <button
              onClick={() => onNavigate('about')}
              className="bg-primary text-white font-label font-bold text-base md:text-lg uppercase px-lg py-sm border-4 border-black rounded-full shadow-[6px_6px_0px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all flex items-center gap-xs"
            >
              About Me <span className="material-symbols-outlined font-bold">arrow_downward</span>
            </button>

            <button
              onClick={() => onNavigate('projects')}
              className="bg-white text-black font-label font-bold text-base md:text-lg uppercase px-lg py-sm border-4 border-black rounded-full shadow-[6px_6px_0px_0px_#00327d] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_#00327d] transition-all flex items-center gap-xs"
            >
              View Projects <span className="material-symbols-outlined font-bold">code</span>
            </button>

            <button
              onClick={onOpenContact}
              className="bg-primary-fixed text-black font-label font-bold text-base md:text-lg uppercase px-lg py-sm border-4 border-black rounded-full shadow-[6px_6px_0px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all flex items-center gap-xs"
            >
              Let's Talk <span className="material-symbols-outlined font-bold">mail</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="w-full bg-primary border-y-4 border-black py-2 overflow-hidden z-20 shadow-[0px_8px_0px_0px_rgba(0,0,0,1)] rotate-1 origin-center scale-105 my-4">
        <div className="animate-marquee inline-block text-white font-display text-2xl md:text-3xl font-extrabold uppercase whitespace-nowrap">
          <span className="mx-8">WHO IS AZMI?</span><span className="mx-4">✦</span>
          <span className="mx-8">WHO IS AZMI?</span><span className="mx-4">✦</span>
          <span className="mx-8">WHO IS AZMI?</span><span className="mx-4">✦</span>
          <span className="mx-8">WHO IS AZMI?</span><span className="mx-4">✦</span>
          <span className="mx-8">WHO IS AZMI?</span><span className="mx-4">✦</span>
          <span className="mx-8">WHO IS AZMI?</span><span className="mx-4">✦</span>
        </div>
      </div>

      {/* About Preview Section */}
      <section className="w-full max-w-7xl mx-auto p-md md:p-xl flex flex-col md:flex-row gap-xl items-center bg-surface-container my-8 rounded-none border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 border-4 border-black"></div>
          <div
            className="w-full max-w-md aspect-square border-4 border-black relative z-10 grayscale hover:grayscale-0 transition-all duration-500 shadow-[6px_6px_0px_0px_#000]"
            style={{ backgroundImage: `url('${profile.portraitUrl}')`, backgroundSize: "cover", backgroundPosition: "center 90%", }}
          ></div>
          <div className="absolute -bottom-6 -right-6 z-20 bg-primary-fixed border-4 border-black px-md py-xs shadow-[4px_4px_0px_0px_#000000] rotate-12">
            <span className="font-display text-xl md:text-headline-md font-extrabold uppercase text-black">Code Wizard</span>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white border-4 border-black p-lg shadow-[8px_8px_0px_0px_#000000]">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold uppercase mb-md inline-block bg-primary text-white px-sm border-2 border-black shadow-[3px_3px_0px_0px_#000]">
            The Architect
          </h2>
          <p className="font-body text-lg text-on-surface mb-lg leading-relaxed">
            {profile.shortBio}
          </p>
          <button
            onClick={() => onNavigate('about')}
            className="bg-primary text-white font-label font-bold text-base uppercase px-md py-sm border-4 border-black shadow-[6px_6px_0px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all inline-flex items-center gap-xs group"
          >
            Read Full Bio <span className="material-symbols-outlined group-hover:rotate-45 transition-transform">arrow_outward</span>
          </button>
        </div>
      </section>

      {/* Full Width Selected Works Marquee Banner */}
      <div className="w-full bg-white text-black border-y-4 border-black py-2 overflow-hidden z-20 shadow-[0px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1 origin-center scale-105 my-4">
        <div className="animate-marquee inline-block text-black font-display text-2xl md:text-3xl font-extrabold uppercase whitespace-nowrap">
          <span className="mx-8">SELECTED WORKS</span><span className="mx-4">✦</span>
          <span className="mx-8">PROJECT PREVIEW</span><span className="mx-4">✦</span>
          <span className="mx-8">SELECTED WORKS</span><span className="mx-4">✦</span>
          <span className="mx-8">PROJECT PREVIEW</span><span className="mx-4">✦</span>
          <span className="mx-8">SELECTED WORKS</span><span className="mx-4">✦</span>
          <span className="mx-8">PROJECT PREVIEW</span><span className="mx-4">✦</span>
        </div>
      </div>

      {/* Selected Works Preview */}
      <section className="w-full max-w-7xl mx-auto p-md md:p-xl flex flex-col gap-lg">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {featuredProjects.map((project) => (
            <motion.article
              key={project.id}
              whileHover={{ y: -8 }}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col group cursor-pointer"
              onClick={() => onSelectProject(project)}
            >
              <div
                className="h-64 border-b-4 border-black bg-primary/20 p-sm bg-cover bg-center relative"
                style={{ backgroundImage: `url('${project.heroImage}')` }}
              >
                <span className="absolute top-3 right-3 bg-secondary-fixed text-black border-2 border-black px-2 py-1 font-label text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#000]">
                  {project.year}
                </span>
              </div>
              <div className="p-md flex flex-col gap-md flex-grow">
                <div>
                  <h3 className="font-display text-2xl font-extrabold uppercase text-black mb-xs">
                    {project.title}
                  </h3>
                  <p className="font-body text-secondary text-base line-clamp-2">
                    {project.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-xs mt-auto">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="bg-secondary-fixed text-black border-2 border-black px-2 py-1 font-label font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onSelectProject(project)}
                  className="mt-2 bg-white text-black px-sm py-xs border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-display font-extrabold text-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase flex items-center justify-center gap-xs"
                >
                  VIEW DETAILS <span className="material-symbols-outlined font-bold">north_east</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => onNavigate('projects')}
            className="bg-primary text-white font-display font-extrabold text-lg uppercase px-xl py-sm border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_0px_#000] transition-all flex items-center gap-2"
          >
            EXPLORE ALL PROJECTS ({projects.length}) <span className="material-symbols-outlined font-bold">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
}
