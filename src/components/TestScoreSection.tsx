'use client';

import { useTranslations, useMessages } from 'next-intl';

interface TestScore {
  test: string;
  score: string;
  date: string;
  details?: string;
}

export default function TestScoreSection() {
  const t = useTranslations('testScores');
  const messages = useMessages() as Record<string, any>;

  const rawItems = messages?.testScores?.items;
  const scores: TestScore[] = Array.isArray(rawItems) ? rawItems : [];

  if (scores.length === 0) {
    return null;
  }

  return (
    <section id="testScores" className="py-20 bg-slate-50 dark:bg-[#0a0720]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 text-slate-900 dark:text-white">
          {t('title', { defaultValue: 'Tests & Évaluations' })}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scores.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-[#100b2e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{item.test}</h3>
                <p className="text-xs text-slate-500">{item.date}</p>
                {item.details && <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{item.details}</p>}
              </div>
              <span className="px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-[#4a00e0] dark:text-purple-300 font-black text-base">
                {item.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
