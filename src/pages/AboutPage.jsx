import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export function AboutPage({ onNavigate, onOpenContact }) {
  const { profile, skills, workHistory, educationAndAwards } = portfolioData;
  const defaultSkill = skills.find((s) => s.highlighted) || skills[0];
  const [selectedSkillId, setSelectedSkillId] = useState(defaultSkill?.id || skills[0]?.id);

  const activeSkill = skills.find((s) => s.id === selectedSkillId) || defaultSkill;
  const currentTechStack = activeSkill?.techStack || [];

  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-on-surface">
      {/* Hero Section */}
      <section className="relative w-full border-b-4 border-black bg-primary flex flex-col items-center justify-center py-xl overflow-hidden shadow-[0_6px_0_0_#000]">
        {/* Diagonal black grid lines pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px'
          }}
        ></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-md text-center">
          <div className="inline-block bg-white border-4 border-black px-md py-xs mb-sm shadow-[6px_6px_0_0_#000] transform -rotate-2">
            <span className="font-display font-extrabold uppercase text-primary tracking-widest text-sm md:text-base">About the Creator</span>
          </div>
          <h1 className="font-display text-[52px] sm:text-[72px] md:text-[96px] leading-[1] font-black text-white uppercase tracking-tighter mix-blend-difference drop-shadow-[4px_4px_0_#000]">
            My Journey <br /><span className="text-secondary-fixed">And Skills</span>
          </h1>
        </div>
      </section>

      {/* Bio Section */}
      <section className="w-full max-w-7xl mx-auto px-md py-xl grid grid-cols-1 lg:grid-cols-12 gap-lg items-center relative z-20">
        {/* Left: Bio Card */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border-4 border-black p-md md:p-lg shadow-[8px_8px_0_0_#00327d] relative transform hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#00327d] transition-all duration-300"
          >
            <div className="absolute -top-6 -left-6 bg-secondary-fixed border-4 border-black w-12 h-12 flex items-center justify-center rounded-full shadow-[4px_4px_0_0_#000]">
              <span className="material-symbols-outlined font-black text-black">waving_hand</span>
            </div>

            <h2 className="font-display text-2xl md:text-[27px] font-extrabold uppercase border-b-4 border-black pb-xs mb-md text-black">
              Hello, I'm {profile.name1}.
            </h2>

            <div className="font-body text-base md:text-lg text-on-surface space-y-sm leading-relaxed">
              {profile.fullBio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-md pt-sm border-t-4 border-black flex flex-wrap gap-xs">
              <span className="bg-primary-fixed border-2 border-black px-xs py-1 font-label font-bold uppercase text-black shadow-[2px_2px_0px_0px_#000]">Clean Code</span>
              <span className="bg-inverse-primary border-2 border-black px-xs py-1 font-label font-bold uppercase text-black shadow-[2px_2px_0px_0px_#000]">Scalable Solutions</span>
              <span className="bg-secondary-fixed border-2 border-black px-xs py-1 font-label font-bold uppercase text-black shadow-[2px_2px_0px_0px_#000]">Continuous Learning</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Portrait */}
        <div className="lg:col-span-5 relative group flex items-center justify-center lg:justify-end p-xs sm:p-sm md:p-md">
          <div className="relative w-full max-w-[510px] aspect-[4/5]">
            {/* Decorative Blue Backdrop Card */}
            <div className="absolute inset-0 bg-primary border-4 border-black shadow-[10px_10px_0_0_#000] transform -rotate-3 group-hover:rotate-0 transition-transform duration-300 z-0 flex flex-col justify-between p-4 pointer-events-none">
              <div className="flex items-center justify-between opacity-30 text-white font-display text-xs sm:text-sm font-bold uppercase tracking-widest">
                <span>PORTRAIT // DEV</span>
                <span className="material-symbols-outlined text-base">verified</span>
              </div>
              <div className="flex items-center justify-between opacity-30 text-white font-display text-xs sm:text-sm font-bold uppercase tracking-widest">
                <span>V2.0</span>
                <span>AZMI.DEV</span>
              </div>
            </div>

            {/* Foreground Photo Frame */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full bg-white border-4 border-black p-3 shadow-[10px_10px_0_0_#000] z-10 transform rotate-2 group-hover:rotate-0 transition-transform duration-300"
            >
              <img
                alt="Muhammad Azmi Portrait"
                className="w-full h-full object-cover border-4 border-black filter grayscale-[15%] contrast-125"
                src={profile.portraitUrl}
              />

              {/* Sticker Accents */}
              <div className="absolute -top-5 -right-5 bg-white text-black border-4 border-black px-md py-1.5 shadow-[4px_4px_0_0_#000] transform rotate-12 group-hover:rotate-6 transition-transform duration-300 font-display font-extrabold text-xs sm:text-sm uppercase z-20">
                Available for Work
              </div>
              <div className="absolute -bottom-5 -left-5 bg-primary text-white border-4 border-black px-md py-1.5 shadow-[4px_4px_0_0_#000] transform -rotate-6 group-hover:-rotate-3 transition-transform duration-300 font-display font-extrabold text-xs sm:text-sm uppercase z-20">
                Est. {profile.yearEst}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Competencies & Technology Stack Section */}
      <section className="w-full bg-surface-container-high border-y-4 border-black py-xl my-8">
        <div className="max-w-7xl mx-auto px-md">
          {/* Core Competencies Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-lg border-b-4 border-black pb-xs gap-xs">
            <div>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-black">
                Core Competencies
              </h2>
              <p className="font-body text-xs md:text-sm text-secondary font-bold mt-1">
                Click any card to filter its specific Technology Stack
              </p>
            </div>
            <span className="material-symbols-outlined text-[36px] md:text-[48px] text-black">terminal</span>
          </div>

          {/* Competencies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
            {skills.map((skill) => {
              const isActive = activeSkill.id === skill.id;

              return (
                <motion.div
                  key={skill.id}
                  onClick={() => setSelectedSkillId(skill.id)}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  className={`border-4 border-black p-sm flex flex-col justify-between min-h-[260px] cursor-pointer transition-all ${isActive
                    ? 'bg-primary text-white shadow-[10px_10px_0_0_#000] -translate-y-2 ring-4 ring-black'
                    : 'bg-white text-on-surface hover:bg-surface-dim shadow-[6px_6px_0_0_#000]'
                    }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-sm">
                      <div className={`w-12 h-12 border-4 border-black flex items-center justify-center shadow-[4px_4px_0_0_#000] ${isActive ? 'bg-white text-black' : 'bg-secondary-fixed text-black'
                        }`}>
                        <span className="material-symbols-outlined font-bold text-2xl">{skill.icon}</span>
                      </div>
                      {isActive && (
                        <span className="bg-secondary-fixed text-black font-display text-[10px] font-black uppercase px-2 py-0.5 border-2 border-black shadow-[2px_2px_0_0_#000]">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-extrabold uppercase mb-xs">
                      {skill.title}
                    </h3>
                    <p className={`font-body text-sm ${isActive ? 'text-primary-fixed' : 'text-on-surface-variant'}`}>
                      {skill.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-sm flex items-center justify-between border-t border-black/20 font-display font-bold text-xs uppercase tracking-wider">
                    <span>{skill.id} // {skill.code}</span>
                    <span className="text-[10px] underline">
                      {isActive ? 'Active Category' : 'View Stack →'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Technology Stack Tags */}
          <div className="mt-lg pt-md border-t-4 border-black">
            <div className="flex items-center gap-xs flex-wrap mb-sm">
              <h3 className="font-display text-xl md:text-2xl font-extrabold uppercase text-black">
                Technology Stack
              </h3>
              {activeSkill && (
                <span className="bg-secondary-fixed text-black border-2 border-black px-xs py-0.5 font-display text-xs font-bold uppercase shadow-[2px_2px_0_0_#000]">
                  {activeSkill.title}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-xs min-h-[48px] items-center">
              {currentTechStack.map((tech, idx) => (
                <motion.span
                  key={`${activeSkill.id}-${tech}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="bg-white text-black border-2 border-black px-sm py-1 font-label font-bold text-xs md:text-sm uppercase shadow-[2px_2px_0_0_#000] hover:bg-primary hover:text-white hover:shadow-[4px_4px_0_0_#000] cursor-pointer transition-all duration-200"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work History Section */}
      <section className="w-full max-w-7xl mx-auto px-md py-xl">
        <div className="flex justify-center mb-xl">
          <div className="bg-primary text-white inline-block px-lg py-xs border-4 border-black shadow-[8px_8px_0_0_#000] transform -rotate-1">
            <h2 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-center">
              Work History
            </h2>
          </div>
        </div>

        <div className="relative pl-sm md:pl-0">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[8px] bg-black -translate-x-1/2 z-0"></div>

          <div className="space-y-xl">
            {workHistory && workHistory.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex flex-col md:flex-row items-center justify-between w-full group ${isEven ? '' : 'md:flex-row-reverse'
                    }`}
                >
                  {/* Timeline Node */}
                  <div className={`absolute left-[28px] md:left-1/2 w-12 h-12 border-4 border-black rounded-full -translate-x-1/2 flex items-center justify-center z-10 shadow-[4px_4px_0_0_#000] group-hover:scale-110 transition-transform ${item.active ? 'bg-primary' : 'bg-white'
                    }`}>
                    <div className={`w-4 h-4 rounded-full ${item.active ? 'bg-white' : 'bg-black'}`}></div>
                  </div>

                  {/* Header Title & Period */}
                  <div className={`w-full md:w-[45%] pl-xl md:pl-0 mb-sm md:mb-0 ${isEven ? 'md:text-right' : 'md:text-left'
                    }`}>
                    <h3 className="font-display text-xl md:text-2xl font-extrabold uppercase text-black">
                      {item.role}
                    </h3>
                    <p className={`font-body text-base md:text-lg font-bold ${item.active ? 'text-primary' : 'text-secondary'
                      }`}>
                      {item.company} // {item.period}
                    </p>
                  </div>

                  {/* Description Box */}
                  <div className={`w-full md:w-[45%] pl-xl md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'
                    }`}>
                    <div className={`border-4 border-black p-sm shadow-[6px_6px_0_0_#000] ${item.active ? 'bg-white' : 'bg-secondary-fixed'
                      }`}>
                      <p className="font-body text-sm md:text-base text-on-surface leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education & Awards Section */}
      <section className="w-full bg-surface border-t-4 border-black py-xl relative overflow-hidden">
        {/* Abstract background blur shape */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary-fixed rounded-full blur-[100px] opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-md relative z-10">
          <div className="mb-lg border-b-8 border-black pb-xs inline-block">
            <h2 className="font-display text-2xl md:text-4xl font-extrabold uppercase text-black">
              Education & Certification
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {educationAndAwards && educationAndAwards.map((item, idx) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="bg-[#FFFDF5] border-4 border-black p-md relative shadow-[8px_8px_0_0_#000] before:content-[''] before:absolute before:inset-2 before:border-2 before:border-dashed before:border-black before:pointer-events-none"
              >
                {/* Badge Icon */}
                <div className={`absolute -top-4 -right-4 border-4 border-black w-16 h-16 rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] ${idx === 0 ? 'bg-primary text-white rotate-12' : 'bg-secondary-fixed text-black -rotate-12'
                  }`}>
                  <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
                </div>

                <div className="text-center mt-sm">
                  <span className="font-display font-bold text-xs uppercase tracking-widest text-secondary block mb-xs">
                    {item.category}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-black uppercase text-black mb-xs">
                    {item.title}
                  </h3>
                  <div className="w-16 h-[4px] bg-black mx-auto my-xs"></div>
                  <p className="font-body text-sm md:text-base font-bold text-black">
                    {item.subtitle}
                  </p>
                  <p className="font-body text-sm text-outline mt-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-md py-lg text-center w-full my-4">
        <div className="bg-white border-4 border-black p-lg shadow-[8px_8px_0_0_#000] flex flex-col md:flex-row items-center justify-between gap-md">
          <div className="text-left">
            <h3 className="font-display text-2xl font-extrabold uppercase text-black">Let's Build Something Amazing</h3>
            <p className="font-body text-base text-secondary mt-1">Have an idea or project in mind? Let's turn it into a modern, scalable, and impactful web application.</p>
          </div>
          <button
            onClick={onOpenContact}
            className="bg-primary text-white font-display font-extrabold text-base uppercase px-lg py-sm border-4 border-black shadow-[6px_6px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all flex items-center gap-2 whitespace-nowrap"
          >
            Let's Connect <span className="material-symbols-outlined">north_east</span>
          </button>
        </div>
      </section>
    </div>
  );
}
