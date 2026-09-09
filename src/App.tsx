import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EcosystemGrid } from './components/EcosystemGrid';
import { Philosophy } from './components/Philosophy';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandMenu } from './components/CommandMenu';

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  const [commandOpen, setCommandOpen] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Page title observer according to format: nbsumit | [Page Name]
  useEffect(() => {
    const sectionTitleMap: Record<string, string> = {
      ecosystem: 'nbsumit | Projects',
      philosophy: 'nbsumit | Philosophy',
      about: 'nbsumit | About',
      connect: 'nbsumit | Contact',
    };

    const handleScroll = () => {
      const sections = ['connect', 'about', 'philosophy', 'ecosystem'];
      let currentSection = '';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            currentSection = sectionId;
            break;
          }
        }
      }

      if (currentSection && sectionTitleMap[currentSection]) {
        document.title = sectionTitleMap[currentSection];
      } else {
        document.title = 'nbsumit | Home';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900">
      {/* Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenCommand={() => setCommandOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero />
        <EcosystemGrid />
        <Philosophy />
        <About />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Command Palette Modal */}
      <CommandMenu
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
      />
    </div>
  );
};

export default App;
