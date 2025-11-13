'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }
    
    // Construire le nouveau pathname avec la nouvelle locale
    const segments = pathname.split('/').filter(Boolean);
    
    // Si le premier segment est une locale valide, la remplacer
    if (segments.length > 0 && (segments[0] === 'fr' || segments[0] === 'en')) {
      segments[0] = newLocale;
    } else {
      // Sinon, ajouter la locale au début
      segments.unshift(newLocale);
    }
    
    // Construire le nouveau pathname
    const newPathname = '/' + segments.join('/');
    
    // Utiliser window.location pour forcer un rechargement complet avec la nouvelle locale
    // Cela garantit que Next.js recharge la page avec les bonnes traductions
    window.location.href = newPathname;
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Change language"
      >
        <GlobeAltIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentLanguage.code.toUpperCase()}
        </span>
      </motion.button>

      {isOpen && (
        <>
          {/* Overlay pour fermer le menu */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu déroulant */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-20"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  locale === language.code
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-xl">{language.flag}</span>
                <span className="flex-1 font-medium">{language.name}</span>
                {locale === language.code && (
                  <motion.div
                    layoutId="activeLanguage"
                    className="w-2 h-2 rounded-full bg-slate-600 dark:bg-slate-400"
                  />
                )}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}

