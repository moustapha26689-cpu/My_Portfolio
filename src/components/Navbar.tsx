'use client';

import { Link } from 'react-scroll';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { 
  HomeIcon, 
  UserIcon, 
  BriefcaseIcon, 
  AcademicCapIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  HeartIcon,
  TrophyIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const t = useTranslations('nav');
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { key: 'home', href: 'hero', icon: HomeIcon },
    { key: 'about', href: 'about', icon: UserIcon },
    { key: 'skills', href: 'skills', icon: BriefcaseIcon },
    { key: 'education', href: 'education', icon: AcademicCapIcon },
    { key: 'experience', href: 'experience', icon: BuildingOfficeIcon },
    { key: 'certifications', href: 'certifications', icon: DocumentTextIcon },
    { key: 'volunteer', href: 'volunteer', icon: HeartIcon },
    { key: 'awards', href: 'awards', icon: TrophyIcon },
    { key: 'testScores', href: 'testScores', icon: ChartBarIcon },
  ];

  // Détecter la section active au scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Trouver la section active
      const sections = navItems.map(item => item.href);
      let currentActive = 'hero';

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Si la section est visible dans le viewport (avec un offset pour la navbar)
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentActive = sections[i];
            break;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Appel initial pour définir la section active au chargement
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-800/50' 
        : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/30 dark:border-gray-800/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo / Nom - Cliquable pour retourner en haut */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <Link
              to="hero"
              smooth={true}
              duration={500}
              className="group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-indigo-700 dark:from-slate-600 dark:to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-white font-bold text-lg">MF</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-700 to-indigo-700 dark:from-slate-300 dark:to-indigo-400 bg-clip-text text-transparent">
                    M. M. Fall
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                    Portfolio
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Navigation Desktop - Toutes les sections */}
          <div className="hidden lg:flex items-center space-x-1 overflow-x-auto scrollbar-hide mr-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href;
              
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 cursor-pointer group ${
                    isActive
                      ? 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50'
                      : 'text-gray-700 dark:text-gray-300 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="whitespace-nowrap">{t(item.key)}</span>
                  
                  {/* Indicateur de section active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-600 to-indigo-600 dark:from-slate-400 dark:to-indigo-400 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side: Language Switcher and Theme Switcher */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* Navigation Mobile - Scroll horizontal */}
      <div className="lg:hidden border-t border-gray-200/50 dark:border-gray-800/50">
        <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href;
            
            return (
              <Link
                key={item.key}
                to={item.href}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer whitespace-nowrap text-xs sm:text-sm ${
                  isActive
                    ? 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50'
                    : 'text-gray-700 dark:text-gray-300 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{t(item.key)}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
}
