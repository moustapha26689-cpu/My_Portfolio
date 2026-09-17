'use client';

import { useTranslations, useMessages } from 'next-intl';
import { motion } from 'framer-motion';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

interface EducationItem {
  degree: string;
  school: string;
  period: string;
  grade: string;
  thesis?: string;
  note?: string;
  context?: string;
}

export default function Education() {
  const t = useTranslations('education');
  const messages = useMessages() as Record<string, any>;

  const rawItems = messages?.education?.items;
  const items: EducationItem[] = Array.isArray(rawItems) ? rawItems : [];

  return (
    <section id="education" className="py-24 md:py-32 bg-slate-50 dark:bg-[#0a0720] transition-colors">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#4a00e0]/10 text-[#4a00e0] mb-4">
            <AcademicCapIcon className="w-7 h-7" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            {t('title', { defaultValue: 'Formation' })}
          </h2>
          <div className="w-24 h-1.5 bg-[#4a00e0] mx-auto rounded-full mb-3" />
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-lg mx-auto font-medium">
            {messages?.education?.subtitle || 'Parcours académique et excellence universitaire'}
          </p>
        </motion.div>

        {/* Education Milestone Cards */}
        <div className="space-y-8">
          {items.map((item, index) => {
            const isMaster = index === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="bg-white dark:bg-[#100b2e] rounded-3xl p-7 sm:p-10 shadow-lg border border-slate-200/80 dark:border-slate-800 relative overflow-hidden"
              >
                {/* Left accent color strip */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-2.5 ${
                    isMaster 
                      ? 'bg-gradient-to-b from-[#4a00e0] to-[#f59e0b]' 
                      : 'bg-gradient-to-b from-[#f59e0b] to-emerald-500'
                  }`} 
                />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block text-xs font-black uppercase tracking-widest text-[#4a00e0] dark:text-purple-400 mb-2">
                      {isMaster ? 'Master Universitaire d\'État' : 'Enseignement Secondaire & Baccalauréat'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                      {item.degree}
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-300 mt-1">
                      {item.school}
                    </p>
                  </div>

                  {/* Period Badge */}
                  <div className="flex flex-row md:flex-col items-start md:items-end gap-2 flex-shrink-0">
                    <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-black tracking-wider uppercase bg-amber-500/10 text-[#d97706] dark:text-amber-400 border border-amber-500/20">
                      {item.period}
                    </span>
                    {item.grade && (
                      <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                        {item.grade}
                      </span>
                    )}
                  </div>
                </div>

                {/* Master Thesis Highlight */}
                {item.thesis && (
                  <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#4a00e0] dark:text-purple-300 mb-1.5">
                      Mémoire de Recherche de Master :
                    </p>
                    <p className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white italic">
                      « {item.thesis} »
                    </p>
                  </div>
                )}

                {/* Additional context or honors */}
                {item.context && (
                  <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {item.context}
                  </p>
                )}

                {item.note && !item.thesis && (
                  <p className="mt-4 text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300">
                    {item.note}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
