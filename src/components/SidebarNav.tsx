'use client';

import { useTranslations } from 'next-intl';
import { Link } from 'react-scroll';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  UserIcon, 
  BriefcaseIcon, 
  AcademicCapIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  HeartIcon,
  TrophyIcon,
  ChartBarIcon,
  EnvelopeIcon,
  ChevronRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface NavItem {
  key: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  emoji: string;
  color: string;
}

export default function SidebarNav() {
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems: NavItem[] = [
    { key: 'home', href: 'hero', icon: HomeIcon, label: 'Accueil', emoji: '🏠', color: 'from-blue-500 to-cyan-500' },
    { key: 'about', href: 'about', icon: UserIcon, label: 'À propos', emoji: '✨', color: 'from-purple-500 to-pink-500' },
    { key: 'skills', href: 'skills', icon: BriefcaseIcon, label: 'Compétences', emoji: '💼', color: 'from-indigo-500 to-blue-500' },
    { key: 'education', href: 'education', icon: AcademicCapIcon, label: 'Formation', emoji: '🎓', color: 'from-green-500 to-emerald-500' },
    { key: 'experience', href: 'experience', icon: BuildingOfficeIcon, label: 'Expérience', emoji: '🚀', color: 'from-orange-500 to-red-500' },
    { key: 'certifications', href: 'certifications', icon: DocumentTextIcon, label: 'Certifications', emoji: '📜', color: 'from-yellow-500 to-orange-500' },
    { key: 'volunteer', href: 'volunteer', icon: HeartIcon, label: 'Engagement', emoji: '❤️', color: 'from-pink-500 to-rose-500' },
    { key: 'awards', href: 'awards', icon: TrophyIcon, label: 'Récompenses', emoji: '🏆', color: 'from-amber-500 to-yellow-500' },
    { key: 'testScores', href: 'testScores', icon: ChartBarIcon, label: 'Scores', emoji: '📊', color: 'from-teal-500 to-cyan-500' },
    { key: 'contact', href: 'contact', icon: EnvelopeIcon, label: 'Contact', emoji: '📧', color: 'from-violet-500 to-purple-500' },
  ];

  // Détecter la section active au scroll et calculer le progrès
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href);
      const scrollPosition = window.scrollY + 200;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculer le progrès de scroll
      const progress = (window.scrollY / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Trouver la section active
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Bouton flottant pour ouvrir le menu mobile */}
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white p-5 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 lg:hidden group"
        aria-label="Open navigation"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </motion.div>
      </motion.button>

      {/* Sidebar Desktop - Toujours visible avec z-index élevé */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="hidden lg:flex fixed left-0 top-0 h-screen w-20 z-[60] flex-col items-center py-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r-2 border-gray-200/50 dark:border-gray-800/50 shadow-2xl"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 60
        }}
      >
        {/* Barre de progression verticale */}
        <motion.div
          className="absolute left-0 top-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30"
          style={{
            height: `${scrollProgress}%`,
            transition: 'height 0.1s ease-out'
          }}
        />

        {/* Logo en haut avec effet 3D */}
        <motion.div
          initial={{ opacity: 0, y: -20, rotateY: -90 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="mb-8 relative"
        >
          <Link
            to="hero"
            smooth={true}
            offset={-100}
            duration={500}
            className="block cursor-pointer group"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              whileTap={{ scale: 0.95 }}
              className="relative w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300"
            >
              {/* Effet de brillance animé */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-3xl relative z-10"
              >
                ✨
              </motion.span>
              
              {/* Particules flottantes */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  animate={{
                    x: [0, Math.random() * 40 - 20],
                    y: [0, Math.random() * 40 - 20],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                />
              ))}
            </motion.div>
          </Link>
        </motion.div>

        {/* Navigation Items avec design créatif */}
        <div className="flex flex-col items-center space-y-4 flex-1 overflow-y-auto py-4 w-full px-2 scrollbar-hide">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href;
            const isHovered = hoveredItem === item.href;
            
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -30, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="relative w-full flex justify-center group"
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={item.href}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className="relative cursor-pointer w-full flex flex-col items-center"
                >
                  {/* Tooltip stylisé avec animation */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.8 }}
                        className="absolute left-full ml-4 px-5 py-3 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 rounded-xl text-sm font-bold whitespace-nowrap shadow-2xl z-[70] pointer-events-none"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{item.emoji}</span>
                          <span>{item.label}</span>
                        </div>
                        {/* Flèche */}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900 dark:border-r-gray-100" />
                        {/* Effet de brillance */}
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Container de l'icône avec effets multiples */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: [0, -5, 5, 0],
                      y: -2
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative p-4 rounded-2xl transition-all duration-500 ${
                      isActive
                        ? `bg-gradient-to-br ${item.color} text-white shadow-2xl scale-110`
                        : 'bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50'
                    }`}
                  >
                    {/* Effet de brillance pour l'item actif */}
                    {isActive && (
                      <>
                        <motion.div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-50 blur-xl`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        />
                      </>
                    )}

                    {/* Effet de particules au hover */}
                    {isHovered && !isActive && (
                      <div className="absolute inset-0 overflow-hidden rounded-2xl">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-blue-500 rounded-full"
                            initial={{
                              x: '50%',
                              y: '50%',
                              opacity: 0,
                            }}
                            animate={{
                              x: `${50 + (Math.random() - 0.5) * 100}%`,
                              y: `${50 + (Math.random() - 0.5) * 100}%`,
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 0.8,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    <Icon className={`w-6 h-6 relative z-10 ${isActive ? 'drop-shadow-lg' : ''}`} />
                  </motion.div>

                  {/* Emoji animé en dessous */}
                  <motion.div
                    initial={{ scale: 0, y: -10 }}
                    animate={{ 
                      scale: isActive ? 1.2 : 0.9,
                      y: 0,
                    }}
                    className={`mt-2 text-sm transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    <motion.span
                      animate={isActive ? {
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: isActive ? Infinity : 0,
                        repeatDelay: 1,
                      }}
                    >
                      {item.emoji}
                    </motion.span>
                  </motion.div>

                  {/* Indicateur de section active - barre verticale animée */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-gradient-to-b ${item.color} rounded-full shadow-lg`}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    >
                      {/* Effet de pulsation */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-b ${item.color} rounded-full`}
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Décoratif animé en bas */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-xl"
          />
        </motion.div>
      </motion.aside>

      {/* Sidebar Mobile - Design amélioré */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay avec blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[90] lg:hidden"
            />
            
            {/* Sidebar Mobile */}
            <motion.aside
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 z-[100] bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="p-6 relative">
                {/* Effet de lumière en haut */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent blur-2xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />

                {/* Header stylisé */}
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg"
                    >
                      <span className="text-2xl">✨</span>
                    </motion.div>
                    <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Navigation
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Explorez mon portfolio
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Menu Items avec design créatif */}
                <nav className="space-y-3 relative z-10">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.href;
                    return (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={item.href}
                          spy={true}
                          smooth={true}
                          offset={-100}
                          duration={500}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                            isActive
                              ? `bg-gradient-to-r ${item.color} text-white shadow-xl`
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {/* Effet de brillance pour l'item actif */}
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              animate={{
                                x: ['-100%', '100%'],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                              }}
                            />
                          )}

                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`p-3 rounded-xl ${
                              isActive 
                                ? 'bg-white/20' 
                                : 'bg-white dark:bg-gray-700 group-hover:scale-110 transition-transform'
                            }`}
                          >
                            <Icon className="w-6 h-6" />
                          </motion.div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{item.emoji}</span>
                              <span className="font-bold text-lg">{item.label}</span>
                            </div>
                            <p className="text-xs opacity-70 mt-0.5">
                              {t(item.key)}
                            </p>
                          </div>

                          {isActive && (
                            <motion.div
                              layoutId="mobileActiveIndicator"
                              className="w-3 h-3 bg-white rounded-full shadow-lg"
                              animate={{
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
