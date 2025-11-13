'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  const t = useTranslations('hero');
  const tContact = useTranslations('contact');
  // Utiliser un key pour forcer le re-render et éviter le cache
  const [profileImage, setProfileImage] = useState('/images/profile/profile.jpg');
  const [imageKey, setImageKey] = useState(Date.now());
  const [imageError, setImageError] = useState(false);

  // Récupérer les informations de contact
  const email = tContact('email');
  const linkedinUrl = tContact('linkedin');
  const whatsappNumber = tContact('whatsapp');

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`, '_blank');
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900 relative overflow-hidden pt-24">
      {/* Effets de fond animés */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-600/20 dark:bg-slate-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 dark:bg-indigo-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="text-center px-4 relative z-10 max-w-4xl mx-auto py-12">
        {/* Image de profil */}
        {!imageError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl ring-4 ring-slate-500/20 dark:ring-slate-400/20">
              <Image
                key={imageKey}
                src={profileImage}
                alt={t('title')}
                fill
                className="object-cover"
                priority
                unoptimized
                onError={() => {
                  // Essayer les autres extensions
                  if (profileImage.includes('.jpg')) {
                    setProfileImage('/images/profile/profile.jpeg');
                    setImageKey(Date.now());
                  } else if (profileImage.includes('.jpeg')) {
                    setProfileImage('/images/profile/profile.png');
                    setImageKey(Date.now());
                  } else {
                    setImageError(true);
                  }
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Nom et titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 px-4">
            <span className="bg-gradient-to-r from-slate-700 via-slate-800 to-indigo-700 dark:from-slate-300 dark:via-slate-200 dark:to-indigo-300 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 px-4">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Boutons de contact - Design compact et moderne */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mb-8 px-4"
        >
          {/* Bouton Email */}
          <motion.a
            href={`mailto:${email}`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 sm:space-x-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-slate-700 to-indigo-700 hover:from-slate-800 hover:to-indigo-800 dark:from-slate-600 dark:to-indigo-600 dark:hover:from-slate-700 dark:hover:to-indigo-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer text-sm sm:text-base w-full sm:w-auto"
          >
            <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{tContact('emailLabel') || 'Email'}</span>
          </motion.a>

          {/* Bouton LinkedIn */}
          <motion.a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 sm:space-x-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#0077b5] hover:bg-[#005885] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer text-sm sm:text-base w-full sm:w-auto"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>LinkedIn</span>
          </motion.a>

          {/* Bouton WhatsApp */}
          <motion.button
            onClick={handleWhatsApp}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 sm:space-x-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer text-sm sm:text-base w-full sm:w-auto"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>WhatsApp</span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
