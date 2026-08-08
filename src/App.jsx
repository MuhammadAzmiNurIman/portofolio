import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { portfolioData } from './data/portfolioData';

function getStateFromPath(pathname) {
  const path = (pathname || '/').toLowerCase();
  if (path === '/about' || path === '/about/') {
    return { tab: 'about', project: null };
  }
  if (path === '/projects' || path === '/projects/') {
    return { tab: 'projects', project: null };
  }
  if (path.startsWith('/projects/')) {
    const slug = path.replace('/projects/', '').replace(/\/$/, '');
    const found = portfolioData.projects.find(p => p.slug === slug || p.id === slug);
    if (found) {
      return { tab: 'detail', project: found };
    }
    return { tab: 'projects', project: null };
  }
  return { tab: 'home', project: null };
}

function getPathForState(tab, project) {
  if (tab === 'about') return '/about';
  if (tab === 'projects') return '/projects';
  if (tab === 'detail' && project) return `/projects/${project.slug || project.id}`;
  return '/';
}

export function App() {
  const [activeTab, setActiveTab] = useState(() => getStateFromPath(window.location.pathname).tab);
  const [selectedProject, setSelectedProject] = useState(() => getStateFromPath(window.location.pathname).project);
  const [contactOpen, setContactOpen] = useState(false);

  // Sync state on popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const state = getStateFromPath(window.location.pathname);
      setActiveTab(state.tab);
      setSelectedProject(state.project);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedProject]);

  const handleSelectProject = (project) => {
    const targetPath = getPathForState('detail', project);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setSelectedProject(project);
    setActiveTab('detail');
  };

  const handleNavigate = (tab) => {
    const targetPath = getPathForState(tab, null);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setSelectedProject(null);
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-background font-body text-on-surface flex flex-col selection:bg-primary selection:text-white">
      {/* Top Navbar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Main Page Area */}
      <main className="w-full pt-20 flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HomePage
                onNavigate={handleNavigate}
                onOpenContact={() => setContactOpen(true)}
                onSelectProject={handleSelectProject}
              />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AboutPage
                onNavigate={handleNavigate}
                onOpenContact={() => setContactOpen(true)}
              />
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectsPage
                onSelectProject={handleSelectProject}
              />
            </motion.div>
          )}

          {activeTab === 'detail' && selectedProject && (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectDetailPage
                project={selectedProject}
                onBack={() => handleNavigate('projects')}
                onSelectProject={handleSelectProject}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* Contact Form Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}

export default App;
