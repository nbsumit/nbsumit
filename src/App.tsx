import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
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
      capabilities: 'nbsumit | Capabilities',
      ecosystem: 'nbsumit | Work',
      process: 'nbsumit | How I Work',
      about: 'nbsumit | About',
      connect: 'nbsumit | Contact',
    };
    const handleScroll = () => {
      const sections = ['connect', 'about', 'process', 'ecosystem', 'capabilities'];
      const current = sections.find((id) => {
        const element = document.getElementById(id);
        return element ? element.getBoundingClientRect().top <= 200 : false;
      });
      document.title = current ? titles[current] : 'nbsumit | Home';
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onOpenCommand={() => setCommandOpen(true)} />
      <main id="main-content">
        <Hero />
        <Capabilities />
        <EcosystemGrid />
        <Philosophy />
        <About />
        <Contact />
      </main>
      <Footer />
      <CommandMenu isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  );
};

export default App;
