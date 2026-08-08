import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export function ProjectsPage({ onSelectProject }) {
  const { projects, profile } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web Design' },
    { id: 'brand', label: 'Branding' },
    { id: 'product', label: 'Product UI' },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full bg-background min-h-screen border-x-4 border-black max-w-[1440px] mx-auto">
      {/* Hero Section */}
      <section className="w-full bg-primary relative border-b-4 border-black px-md py-xl overflow-hidden flex items-center min-h-[38vh]">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'linear-gradient(to right, #000 2px, transparent 2px), linear-gradient(to bottom, #000 2px, transparent 2px)',
              backgroundSize: '64px 64px'
            }}
          ></div>
        </div>

        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-lg">
          <div className="flex flex-col gap-sm max-w-3xl">
            <div className="inline-flex items-center gap-xs bg-white text-on-surface border-4 border-black px-sm py-xs w-max shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="material-symbols-outlined text-primary font-bold">folder_open</span>
              <span className="font-display font-extrabold uppercase text-xs tracking-wider">Directory 2026</span>
            </div>
            <h1 className="font-display text-[56px] sm:text-[72px] md:text-[88px] leading-[0.9] text-white font-extrabold tracking-tighter uppercase drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              Project<br />Vault
            </h1>
            <p className="font-body text-base md:text-lg text-primary-fixed max-w-xl mt-sm leading-relaxed">
              A curated collection of digital experiences, brutalist interfaces, and high-impact functional design experiments.
            </p>
          </div>

          <div className="flex flex-col gap-sm">
            <div className="bg-secondary-fixed text-on-secondary-fixed border-4 border-black p-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between w-64">
              <span className="font-display font-extrabold uppercase text-sm">Total Works</span>
              <span className="font-display font-extrabold text-2xl">{projects.length}</span>
            </div>
            <div className="bg-tertiary-fixed text-on-tertiary-fixed border-4 border-black p-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between w-64">
              <span className="font-display font-extrabold uppercase text-sm">Status</span>
              <div className="flex items-center gap-xs">
                <div className="w-3 h-3 bg-primary border-2 border-black rounded-full animate-pulse"></div>
                <span className="font-display font-extrabold text-xl">{profile.status}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="w-full bg-white border-b-4 border-black p-md sticky top-20 z-40">
        <div className="flex flex-col md:flex-row justify-between items-center gap-md w-full">
          <div className="flex flex-wrap gap-xs w-full md:w-auto">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`border-4 border-black px-sm py-xs font-display font-extrabold text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${activeFilter === option.id
                    ? 'bg-primary text-white translate-x-[2px] translate-y-[2px] shadow-none'
                    : 'bg-white text-on-surface hover:bg-primary-fixed hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="SEARCH PROJECTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface text-on-surface border-4 border-black pl-10 pr-sm py-xs font-body font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-primary-fixed transition-colors text-sm uppercase"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface font-bold text-lg">
              search
            </span>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="w-full p-md md:p-xl bg-background min-h-[50vh]">
        {filteredProjects.length === 0 ? (
          <div className="bg-white border-4 border-black p-xl text-center shadow-[8px_8px_0px_0px_#000]">
            <span className="material-symbols-outlined text-5xl text-primary mb-2">search_off</span>
            <h3 className="font-display font-extrabold text-2xl uppercase">No matching projects found</h3>
            <p className="font-body text-secondary mt-1">Try resetting search filters or keywords.</p>
            <button
              onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
              className="mt-4 bg-primary text-white border-4 border-black px-md py-xs font-display font-bold text-sm uppercase shadow-[4px_4px_0px_0px_#000]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8 }}
                onClick={() => onSelectProject(project)}
                className="flex flex-col bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer group"
              >
                <div className="h-64 w-full border-b-4 border-black relative overflow-hidden bg-surface-container-high">
                  <img
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={project.heroImage}
                  />
                  <div className="absolute top-sm right-sm bg-secondary text-white border-2 border-black px-xs py-1 font-display font-bold text-xs uppercase rotate-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {project.year}
                  </div>
                  {project.badge && (
                    <div className="absolute top-sm left-sm bg-tertiary text-white border-2 border-black px-xs py-1 font-display font-bold text-xs uppercase -rotate-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {project.badge}
                    </div>
                  )}
                </div>

                <div className="p-md flex flex-col flex-grow gap-sm bg-white text-on-surface">
                  <h2 className="font-display text-2xl font-extrabold uppercase text-black truncate">
                    {project.title}
                  </h2>
                  <p className="font-body text-secondary text-sm line-clamp-3 flex-grow leading-relaxed">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-xs mt-auto pt-sm border-t-2 border-black">
                    <span className="bg-primary text-white border-2 border-black px-2 py-1 font-display font-bold text-[10px] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {project.categoryName}
                    </span>
                    {project.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="bg-secondary-fixed text-black border-2 border-black px-2 py-1 font-display font-bold text-[10px] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
