import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { Services } from './components/Services';
import { Approach } from './components/Approach';
import { About } from './components/About';
import { Writing } from './components/Writing';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandMenu } from './components/CommandMenu';
import { SITE_CONFIG } from './config/site';

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const handleCommandShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    window.addEventListener('keydown', handleCommandShortcut);
    return () => window.removeEventListener('keydown', handleCommandShortcut);
  }, []);

  useEffect(() => {
    const titles: Record<string, string> = {
      work: 'nbsumit | Work',
      services: 'nbsumit | Services',
      approach: 'nbsumit | Approach',
      about: 'nbsumit | About',
      writing: 'nbsumit | Writing',
      contact: 'nbsumit | Contact',
    };

    const handleScroll = () => {
      const sections = ['contact', 'writing', 'about', 'approach', 'services', 'work'];
      const current = sections.find((id) => {
        const element = document.getElementById(id);
        return element ? element.getBoundingClientRect().top <= 200 : false;
      });
      document.title = current ? titles[current] : SITE_CONFIG.title;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900 font-sans transition-colors duration-200">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400"
      >
        Skip to main content
      </a>

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenCommand={() => setCommandOpen(true)}
      />

      <main id="main-content">
        <Hero />
        <Work />
        <Services />
        <Approach />
        <About />
        <Writing />
        <Contact />
      </main>

      <Footer />

      <CommandMenu
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onToggleTheme={() => setDarkMode(!darkMode)}
        darkMode={darkMode}
      />
    </div>
  );
};

export default App;
