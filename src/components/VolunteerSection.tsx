'use client';

import { useTranslations, useMessages } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UserGroupIcon } from '@heroicons/react/24/outline';

interface VolunteerItem {
  role: string;
  organization: string;
  period: string;
  description?: string;
}

export default function VolunteerSection() {
  const t = useTranslations('volunteer');
  const messages = useMessages() as Record<string, any>;

  const rawItems = messages?.volunteer?.items;
  const items: VolunteerItem[] = Array.isArray(rawItems) ? rawItems : [];

  // Real photos available in public/images/volunteer/
  const volunteerPhotos: Record<number, string> = {
    0: '/images/volunteer/ugesm/moi-1.jpg',
    1: '/images/volunteer/ugesm/moi-2.jpg',
    2: '/images/volunteer/udei-encg/moi-1.jpg',
  };

  return (
    <section id="volunteer" className="py-24 md:py-32 bg-white dark:bg-[#0c0827] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 mb-4">
            <UserGroupIcon className="w-7 h-7" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            {t('title', { defaultValue: 'Engagement Associatif' })}
          </h2>
          <div className="w-24 h-1.5 bg-rose-500 mx-auto rounded-full mb-3" />
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-lg mx-auto font-medium">
            {messages?.volunteer?.subtitle || 'Leadership citoyen, gouvernance étudiante et coordination d\'événements'}
          </p>
        </motion.div>

        {/* Volunteer Cards */}
        <div className="space-y-8">
          {items.map((item, index) => {
            const photo = volunteerPhotos[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-[#100b2e] rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-md border border-slate-200/80 dark:border-slate-800 transition-all flex flex-col md:flex-row gap-6 items-start justify-between"
              >
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      {item.role} <span className="font-normal text-slate-400 text-base sm:text-lg">chez</span> <span className="text-rose-600 dark:text-rose-400">{item.organization}</span>
                    </h3>
                    <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 w-max">
                      {item.period}
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Event / Action Photo Thumbnail if available */}
                {photo && (
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md border-2 border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <Image
                      src={photo}
                      alt={item.organization}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
