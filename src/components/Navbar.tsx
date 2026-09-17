'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

const navItems = [
  { key: 'home', href: 'hero' },
  { key: 'about', href: 'about' },
  { key: 'skills', href: 'skills' },
  { key: 'education', href: 'education' },
  { key: 'experience', href: 'experience' },
  { key: 'certifications', href: 'certifications' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-[#0c0827]/95 backdrop-blur-md shadow-md border-b border-slate-100 dark:border-slate-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo brand (ALWAYS "Moustapha", never translated to "Accueil") */}
          <div 
            onClick={scrollToTop} 
            className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-[#1a1145] to-[#4a00e0] rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="font-extrabold text-xl text-[#1a1145] dark:text-white tracking-tight">
              Moustapha
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.href}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    activeClass="text-[#4a00e0] dark:text-amber-400 font-bold after:content-[''] after:block after:w-full after:h-0.5 after:bg-[#f59e0b] after:mt-1 after:rounded-full"
                    className="text-slate-600 dark:text-slate-300 hover:text-[#4a00e0] dark:hover:text-amber-300 font-semibold cursor-pointer transition-colors text-sm uppercase tracking-wider"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </div>
          
          {/* Mobile Menu Actions */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-[#1a1145] dark:text-white p-2 rounded-lg bg-slate-100 dark:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white dark:bg-[#0c0827] border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
          >
            <ul className="flex flex-col py-5 px-6 space-y-4">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.href}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    onClick={() => setIsOpen(false)}
                    activeClass="text-[#4a00e0] dark:text-amber-400 font-bold border-l-4 border-[#f59e0b] pl-3"
                    className="text-slate-700 dark:text-slate-200 font-semibold block uppercase text-sm tracking-wider hover:text-[#4a00e0] dark:hover:text-amber-300 transition-colors py-1"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
