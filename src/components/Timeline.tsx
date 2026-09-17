'use client';

import { useTranslations, useMessages } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BriefcaseIcon, ArrowTopRightOnSquareIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface ExperienceItem {
  title: string;
  role?: string;
  company: string;
  period: string;
  location?: string;
  description?: string;
  detailedDescription?: string;
  attestationUrl?: string;
  image?: string;
  tags?: string[];
}

export default function Timeline() {
  const t = useTranslations('experience');
  const messages = useMessages() as Record<string, any>;

  const rawItems = messages?.experience?.items;
  const items: ExperienceItem[] = Array.isArray(rawItems) ? rawItems : [];

  // Attestations and real photo map
  const experienceAssets: Record<string, { attestation?: string; photo?: string }> = {
    'tree partners advisory': {
      attestation: '/images/attestations/tree-partners-advisory/attestation.pdf',
    },
    'd?fi expertise': {
      attestation: '/images/attestations/defi-expertise/attestation.pdf',
      photo: '/images/experiences/defi-expertise/moi-1.jpg',
    },
    'defi expertise': {
      attestation: '/images/attestations/defi-expertise/attestation.pdf',
      photo: '/images/experiences/defi-expertise/moi-1.jpg',
    },
    'fidu soumaya': {
      attestation: '/images/attestations/fidu-soumaya/attestation.pdf',
      photo: '/images/experiences/fidu-soumaya/moi-1.jpg',
    },
    'institut de transformation': {
      attestation: '/images/attestations/institut-transformation/attestation.pdf',
    },
    'tr?sorerie g?n?rale': {
      attestation: '/images/attestations/tresorerie-generale/attestation.pdf',
      photo: '/images/experiences/tresorerie-generale/moi-1.jpg',
    },
    'tresorerie generale': {
      attestation: '/images/attestations/tresorerie-generale/attestation.pdf',
      photo: '/images/experiences/tresorerie-generale/moi-1.jpg',
    },
  };

  const getAsset = (company: string) => {
    const c = company.toLowerCase();
    for (const key of Object.keys(experienceAssets)) {
      if (c.includes(key) || key.includes(c)) {
        return experienceAssets[key];
      }
    }
    return {};
  };

  return (
    <section id="experience" className="py-24 md:py-32 bg-white dark:bg-[#0c0827] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 mb-4">
            <BriefcaseIcon className="w-7 h-7" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1a1145] dark:text-white tracking-tight mb-3">
            {t('title', { defaultValue: 'Expérience' })}
          </h2>
          <div className="w-24 h-1.5 bg-[#f59e0b] mx-auto rounded-full mb-3" />
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-lg mx-auto font-medium">
            {messages?.experience?.subtitle || 'Cabinet d\'expertise comptable, audit financier & trésorerie'}
          </p>
        </motion.div>

        {/* Experience Timeline Cards */}
        <div className="space-y-10">
          {items.map((item, index) => {
            const assets = getAsset(item.company);
            const attestation = item.attestationUrl || assets.attestation;
            const photo = assets.photo;
            const isCurrent = index === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-3xl p-7 sm:p-9 transition-all duration-300 border ${
                  isCurrent 
                    ? 'bg-slate-50 dark:bg-[#120c35] border-amber-400/50 shadow-xl' 
                    : 'bg-white dark:bg-[#100b2e] border-slate-200 dark:border-slate-800/80 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        {item.title}
                      </span>
                      {isCurrent && (
                        <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          Poste Actuel
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-lg font-extrabold text-[#4a00e0] dark:text-purple-400">
                      {item.company}
                    </h4>
                  </div>

                  {/* Period & Location Badge */}
                  <div className="flex flex-col md:items-end gap-1 flex-shrink-0">
                    <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-black tracking-wide uppercase bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      {item.period}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                        <MapPinIcon className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Body: Description + Optional Photo + Attestation Link */}
                <div className="pt-5 flex flex-col md:flex-row gap-6 items-start justify-between">
                  <div className="flex-1 space-y-4">
                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                      {item.detailedDescription || item.description}
                    </p>

                    {/* Attestation Action Button */}
                    {attestation && (
                      <div className="pt-2">
                        <a
                          href={attestation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm tracking-wide transition-all shadow-sm hover:shadow-md"
                        >
                          <span>{t('viewCert', { defaultValue: 'Voir l\'attestation officielle' })}</span>
                          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Real Photo Thumbnail if available */}
                  {photo && (
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md border-2 border-slate-200 dark:border-slate-700 flex-shrink-0">
                      <Image
                        src={photo}
                        alt={item.company}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
