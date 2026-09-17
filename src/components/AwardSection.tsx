'use client';

import { useTranslations, useMessages } from 'next-intl';

interface Award {
  title: string;
  organization: string;
  date: string;
  description?: string;
}

export default function AwardSection() {
  const t = useTranslations('awards');
  const messages = useMessages() as Record<string, any>;

  const rawItems = messages?.awards?.items;
  const awards: Award[] = Array.isArray(rawItems) ? rawItems : [];

  if (awards.length === 0) {
    return null;
  }

  return (
    <section id="awards" className="py-20 bg-white dark:bg-[#0c0827]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 text-slate-900 dark:text-white">
          {t('title', { defaultValue: 'Distinctions' })}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {awards.map((award, index) => (
            <div
              key={index}
              className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{award.title}</h3>
              <p className="text-sm font-semibold text-[#4a00e0]">{award.organization} • {award.date}</p>
              {award.description && <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{award.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
