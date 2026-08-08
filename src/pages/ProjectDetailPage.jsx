import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export function ProjectDetailPage({ project, onBack, onSelectProject }) {
  const { projects } = portfolioData;
  const [alertConfig, setAlertConfig] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);

  // Find index for prev/next project navigation
  const currentIndex = projects.findIndex(p => p.id === project.id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const handleLivePreviewClick = (e) => {
    e.preventDefault();
    const url = project.liveUrl ? project.liveUrl.trim() : '';
    if (!url || url === '...' || url === '#') {
      setAlertConfig({
        badge: 'PROJECT STATUS',
        title: 'LIVE PREVIEW NOT AVAILABLE',
        message: 'Sorry, the live preview for this project is currently not publicly hosted or is running in a private environment.',
      });
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSourceCodeClick = (e) => {
    e.preventDefault();
    const url = project.sourceUrl ? project.sourceUrl.trim() : '';
    if (!url || url === '...' || url === '#') {
      setAlertConfig({
        badge: 'RESTRICTED ACCESS',
        title: 'SOURCE CODE PRIVATE',
        message: 'The source code for this project is private or protected under a Non-Disclosure Agreement (NDA).',
      });
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col w-full max-w-[1440px] mx-auto px-md md:px-xl pb-xl gap-lg pt-8 relative"
    >
      {/* Alert Modal - Styled matching ContactModal */}
      <AnimatePresence>
        {alertConfig && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white border-4 border-black p-6 md:p-8 w-full max-w-lg shadow-[10px_10px_0px_0px_#00327d] relative flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setAlertConfig(null)}
                className="absolute top-4 right-4 bg-primary text-white border-2 border-black p-1 shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
              >
                <span className="material-symbols-outlined font-bold">close</span>
              </button>

              <div className="inline-block w-fit bg-primary text-white border-2 border-black px-3 py-1 mb-3 shadow-[3px_3px_0px_0px_#000] transform -rotate-1">
                <span className="font-display font-bold uppercase text-xs tracking-widest">
                  {alertConfig.badge}
                </span>
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-extrabold uppercase text-black mb-4">
                {alertConfig.title}
              </h2>

              <div className="bg-primary-fixed border-4 border-black p-4 my-2 shadow-[4px_4px_0px_0px_#000]">
                <p className="font-body text-base text-black leading-relaxed">
                  {alertConfig.message}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setAlertConfig(null)}
                className="mt-4 w-full bg-primary text-white font-display font-extrabold text-base uppercase px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all flex items-center justify-center gap-2"
              >
                UNDERSTOOD <span className="material-symbols-outlined">check_circle</span>
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Back Button */}
      <button 
        onClick={onBack}
        className="w-fit bg-white text-black border-4 border-black px-md py-xs font-display font-extrabold text-sm uppercase shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-xs"
      >
        <span className="material-symbols-outlined font-bold text-base">arrow_back</span>
        Back to Vault
      </button>

      {/* Header Info Card */}
      <div className="bg-surface border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div className="flex flex-col gap-sm max-w-full md:max-w-[70%]">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase text-on-surface break-words tracking-tighter">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-xs mt-1">
            <span className="bg-primary text-white font-display font-bold text-xs uppercase border-2 border-black px-xs py-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {project.categoryName}
            </span>
            {project.tags.map((tag, idx) => (
              <span key={idx} className="bg-primary-fixed text-black font-display font-bold text-xs uppercase border-2 border-black px-xs py-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-sm w-full md:w-auto">
          <button 
            onClick={handleLivePreviewClick}
            className="bg-primary text-white border-4 border-black px-sm py-2 font-display font-extrabold text-sm uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-xs"
          >
            Live Preview <span className="material-symbols-outlined text-[18px]">north_east</span>
          </button>
          <button 
            onClick={handleSourceCodeClick}
            className="bg-surface text-black border-4 border-black px-sm py-2 font-display font-extrabold text-sm uppercase shadow-[6px_6px_0px_0px_#2559bd] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_#2559bd] transition-all flex items-center justify-center gap-xs"
          >
            Source Code <span className="material-symbols-outlined text-[18px]">code</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid: Specs & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Specs Side Card */}
        <div className="lg:col-span-1 bg-surface border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col h-fit">
          <div className="bg-primary border-b-4 border-black p-sm flex items-center justify-between">
            <h2 className="font-display font-extrabold text-xl uppercase text-white">Specs</h2>
            <span className="material-symbols-outlined text-white font-bold">wysiwyg</span>
          </div>

          <div className="flex flex-col font-body">
            <div className="border-b-4 border-black p-sm flex justify-between items-center bg-surface hover:bg-inverse-surface hover:text-white transition-colors group">
              <span className="font-display font-bold uppercase text-sm">Role</span>
              <span className="font-medium text-sm text-on-surface group-hover:text-white">{project.role}</span>
            </div>
            <div className="border-b-4 border-black p-sm flex justify-between items-center bg-surface hover:bg-inverse-surface hover:text-white transition-colors group">
              <span className="font-display font-bold uppercase text-sm">Timeline</span>
              <span className="font-medium text-sm text-on-surface group-hover:text-white">{project.timeline}</span>
            </div>
            <div className="border-b-4 border-black p-sm flex justify-between items-center bg-surface hover:bg-inverse-surface hover:text-white transition-colors group">
              <span className="font-display font-bold uppercase text-sm">Client</span>
              <span className="font-medium text-sm text-on-surface group-hover:text-white">{project.client}</span>
            </div>
            <div className="p-sm flex justify-between items-center bg-surface hover:bg-inverse-surface hover:text-white transition-colors group">
              <span className="font-display font-bold uppercase text-sm">Year</span>
              <span className="font-medium text-sm text-on-surface group-hover:text-white">{project.year}</span>
            </div>
          </div>
        </div>

        {/* Project Overview Narrative */}
        <div className="lg:col-span-2 bg-surface border-4 border-black shadow-[8px_8px_0px_0px_#2559bd] p-lg flex flex-col gap-sm">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold uppercase text-on-surface border-b-4 border-black pb-xs inline-block w-fit">
            Project Overview
          </h2>
          <div className="font-body text-base md:text-lg text-on-surface space-y-4 mt-sm leading-relaxed">
            {project.overview.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Image Lightbox Modal */}
      <AnimatePresence>
        {zoomImage && (
          <div 
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-4 border-black p-4 max-w-5xl w-full max-h-[90vh] shadow-[12px_12px_0_0_#00327d] flex flex-col gap-2 relative overflow-hidden"
            >
              <div className="flex justify-between items-center border-b-4 border-black pb-2">
                <span className="font-display font-extrabold uppercase text-sm md:text-base text-black">
                  {zoomImage.title || project.title}
                </span>
                <button 
                  onClick={() => setZoomImage(null)}
                  className="bg-primary text-white border-2 border-black px-3 py-1 font-display font-bold text-xs uppercase shadow-[2px_2px_0_0_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                >
                  CLOSE [X]
                </button>
              </div>
              <div className="w-full overflow-auto max-h-[75vh] flex items-center justify-center bg-surface-container p-2 border-2 border-black">
                <img 
                  src={zoomImage.url || zoomImage} 
                  alt={zoomImage.title || project.title}
                  className="max-w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Image Gallery Showcase */}
      <div className="w-full flex flex-col gap-md my-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-4 border-black pb-1 gap-xs">
          <h2 className="font-display text-2xl font-extrabold uppercase">
            Visual Artifacts
          </h2>
          <span className="font-display text-xs font-bold uppercase text-secondary">
            Click any image to inspect full size 🔍
          </span>
        </div>

        {/* Main Big Screenshot */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-white">
            <div className="bg-primary text-white border-b-4 border-black px-md py-xs flex justify-between items-center">
              <span className="font-display font-extrabold text-xs md:text-sm uppercase tracking-wider">
                FEATURED // {project.gallery[0]?.title || project.title}
              </span>
              <span className="font-display font-bold text-[10px] uppercase bg-white text-black px-2 py-0.5 border border-black shadow-[2px_2px_0_0_#000]">
                Artifact 01
              </span>
            </div>
            <div 
              onClick={() => setZoomImage(project.gallery[0])}
              className="p-2 sm:p-4 flex items-center justify-center bg-white cursor-zoom-in group"
            >
              <img 
                alt={project.gallery[0]?.title || project.title}
                className="w-full h-auto max-h-[750px] object-contain group-hover:scale-[1.01] transition-transform duration-300" 
                src={project.gallery[0]?.url || project.heroImage} 
              />
            </div>
          </div>
        )}

        {/* Multi-column secondary screenshots */}
        {project.gallery && project.gallery.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {project.gallery.slice(1).map((item, idx) => (
              <div key={idx} className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-white flex flex-col justify-between">
                <div className="bg-surface-dim border-b-2 border-black px-sm py-1 flex justify-between items-center">
                  <span className="font-display font-bold text-xs uppercase text-black">
                    Artifact 0{idx + 2} // {item.title}
                  </span>
                  <span className="font-display text-[10px] font-bold uppercase text-secondary">
                    Zoom 🔍
                  </span>
                </div>
                <div 
                  onClick={() => setZoomImage(item)}
                  className="p-3 flex items-center justify-center bg-white h-[360px] overflow-hidden cursor-zoom-in group"
                >
                  <img 
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300" 
                    src={item.url} 
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Next/Prev Navigation Bar */}
      <div className="flex justify-between items-center border-t-4 border-black pt-lg mt-md">
        <button 
          onClick={() => onSelectProject(prevProject)}
          className="bg-surface text-on-surface border-4 border-black px-md py-sm font-display font-extrabold text-sm md:text-headline-md uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-sm"
        >
          <span className="material-symbols-outlined text-[24px] md:text-[32px]">arrow_back</span>
          <span className="hidden md:inline">Prev: {prevProject.title}</span>
        </button>

        <button 
          onClick={() => onSelectProject(nextProject)}
          className="bg-surface text-on-surface border-4 border-black px-md py-sm font-display font-extrabold text-sm md:text-headline-md uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-sm"
        >
          <span className="hidden md:inline">Next: {nextProject.title}</span>
          <span className="material-symbols-outlined text-[24px] md:text-[32px]">arrow_forward</span>
        </button>
      </div>
    </motion.div>
  );
}
