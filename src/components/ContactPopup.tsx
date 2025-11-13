'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { XMarkIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function ContactPopup() {
  const t = useTranslations('contact');
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Récupérer les informations de contact
  const email = t('email');
  const phone = t('phone');
  const whatsappNumber = t('whatsapp');
  const linkedinUrl = t('linkedin');

  useEffect(() => {
    // Vérifier si la popup a déjà été affichée dans cette session
    const popupShown = sessionStorage.getItem('contactPopupShown');
    
    if (!popupShown) {
      // Afficher la popup après 30 secondes ou après avoir scrollé 30% de la page
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('contactPopupShown', 'true');
      }, 30000);

      const handleScroll = () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercentage > 30 && !hasShown) {
          setIsOpen(true);
          setHasShown(true);
          sessionStorage.setItem('contactPopupShown', 'true');
          clearTimeout(timer);
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`, '_blank');
    handleClose();
  };

  const handleEmail = () => {
    window.location.href = `mailto:${email}`;
    handleClose();
  };

  const handlePhone = () => {
    window.location.href = `tel:${whatsappNumber}`;
    handleClose();
  };

  const handleLinkedIn = () => {
    window.open(linkedinUrl, '_blank');
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 md:bottom-8 md:right-8 z-[61] w-auto sm:w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mx-auto"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-slate-700 via-slate-800 to-indigo-700 dark:from-slate-600 dark:via-slate-700 dark:to-indigo-600 p-6">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-white" />
              </button>
              
              <h3 className="text-xl font-bold text-white mb-2 pr-8">
                {t('popupTitle')}
              </h3>
              <p className="text-white/90 text-sm">
                {t('popupMessage')}
              </p>
            </div>

            {/* Contenu */}
            <div className="p-6 space-y-3">
              {/* Email */}
              <motion.button
                onClick={handleEmail}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-slate-100 to-indigo-100 dark:from-slate-700 dark:to-indigo-900/30 hover:from-slate-200 hover:to-indigo-200 dark:hover:from-slate-600 dark:hover:to-indigo-900/50 rounded-lg transition-all group"
              >
                <div className="p-2 bg-gradient-to-r from-slate-600 to-indigo-600 dark:from-slate-500 dark:to-indigo-500 rounded-lg group-hover:scale-110 transition-transform">
                  <EnvelopeIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">{t('emailLabel')}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 truncate">{email}</div>
                </div>
              </motion.button>

              {/* LinkedIn */}
              <motion.button
                onClick={handleLinkedIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 px-4 py-3 bg-[#0077b5]/10 dark:bg-[#0077b5]/20 hover:bg-[#0077b5]/20 dark:hover:bg-[#0077b5]/30 rounded-lg transition-all group"
              >
                <div className="p-2 bg-[#0077b5] rounded-lg group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">LinkedIn</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Profil professionnel</div>
                </div>
              </motion.button>

              {/* WhatsApp */}
              <motion.button
                onClick={handleWhatsApp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 px-4 py-3 bg-[#25D366]/10 dark:bg-[#25D366]/20 hover:bg-[#25D366]/20 dark:hover:bg-[#25D366]/30 rounded-lg transition-all group"
              >
                <div className="p-2 bg-[#25D366] rounded-lg group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">WhatsApp</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Message direct</div>
                </div>
              </motion.button>

              {/* Téléphone */}
              <motion.button
                onClick={handlePhone}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 rounded-lg transition-all group"
              >
                <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                  <PhoneIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">{t('phoneLabel')}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{whatsappNumber}</div>
                </div>
              </motion.button>

              {/* Bouton "Peut-être plus tard" */}
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                {t('popupDismiss')}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

