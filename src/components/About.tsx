'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useRef } from 'react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const groupVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function About() {
  const tAbout = useTranslations('about');
  const tHero = useTranslations('hero');
  const tContact = useTranslations('contact');
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const rawPhone = tContact('phone', { defaultValue: '+212 710-928562' });
  const cleanPhone = rawPhone.replace(/[^0-9+]/g, '');
  const rawEmail = tContact('email', { defaultValue: 'moustapha26689@gmail.com' });
  const rawWhatsapp = tContact('whatsapp', { defaultValue: '+212710928562' });
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, '');

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 bg-white dark:bg-[#0c0827] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight flex items-center justify-center gap-2 sm:gap-3">
            <span className="text-[#1a1145] dark:text-white">{tAbout('title', { defaultValue: 'À Propos' })}</span>
            <span className="text-[#4a00e0]">{tAbout('me', { defaultValue: 'de Moi' })}</span>
          </h2>
          <div className="w-20 sm:w-24 h-1.5 bg-[#4a00e0] mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Two-Column Layout (Responsive Stack on Mobile) */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 sm:gap-12 lg:gap-16">
          
          {/* Left Column: Profile Photo */}
          <motion.div 
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 dark:border-slate-800">
              <Image 
                src="/images/profile/profile.jpg"
                alt="Mouhamadou Moustapha Fall"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 256px, (max-width: 1024px) 384px, 450px"
                priority
              />
            </div>
          </motion.div>

          {/* Right Column: Animated Presentation by Sequential Groups */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-5 sm:space-y-6"
          >
            
            {/* Groupe 1: Identité & Rôle */}
            <motion.div variants={groupVariants} className="w-full">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                Mouhamadou Moustapha Fall
              </h3>
              <p className="text-base sm:text-lg md:text-xl font-bold mt-1.5 text-[#4a00e0] dark:text-purple-400">
                {tHero('subtitle')}
              </p>
            </motion.div>

            {/* Groupe 2: Paragraphe de présentation */}
            <motion.div variants={groupVariants} className="w-full">
              <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {tAbout('description')}
              </p>
            </motion.div>

            {/* Groupe 3: Coordonnées Minimalistes & Cliquables (Style ultra épuré façon Nassim Oulkaid) */}
            <motion.div variants={groupVariants} className="w-full pt-1 space-y-2.5 sm:space-y-3">
              
              {/* Ligne Téléphone */}
              <div className="flex flex-wrap items-baseline gap-2 text-sm sm:text-base md:text-lg">
                <span className="font-bold text-[#4a00e0] dark:text-purple-400">
                  {tContact('phoneLabel', { defaultValue: 'Phone' })} :
                </span>
                <a
                  href={`tel:${cleanPhone}`}
                  className="font-semibold text-slate-800 dark:text-slate-200 hover:text-[#4a00e0] dark:hover:text-purple-400 hover:underline transition-colors py-1 cursor-pointer"
                  title="Appeler"
                >
                  {rawPhone}
                </a>
              </div>

              {/* Ligne WhatsApp */}
              <div className="flex flex-wrap items-baseline gap-2 text-sm sm:text-base md:text-lg">
                <span className="font-bold text-[#16a34a] dark:text-[#25D366]">
                  WhatsApp :
                </span>
                <a
                  href={`https://wa.me/${cleanWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-800 dark:text-slate-200 hover:text-[#16a34a] dark:hover:text-[#25D366] hover:underline transition-colors py-1 cursor-pointer"
                  title="Discuter sur WhatsApp"
                >
                  {rawPhone}
                </a>
              </div>

              {/* Ligne Email */}
              <div className="flex flex-wrap items-baseline gap-2 text-sm sm:text-base md:text-lg">
                <span className="font-bold text-[#4a00e0] dark:text-purple-400">
                  {tContact('emailLabel', { defaultValue: 'Email' })} :
                </span>
                <a
                  href={`mailto:${rawEmail}`}
                  className="font-semibold text-slate-800 dark:text-slate-200 hover:text-[#4a00e0] dark:hover:text-purple-400 hover:underline transition-colors py-1 cursor-pointer break-all"
                  title="Envoyer un email"
                >
                  {rawEmail}
                </a>
              </div>

            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
