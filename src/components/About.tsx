'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { safeTranslateRaw } from '@/lib/translationUtils';

export default function About() {
  const t = useTranslations('about');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black relative overflow-hidden">
      {/* Effets de fond animés */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-slate-600/10 dark:bg-slate-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-700 via-slate-800 to-indigo-700 dark:from-slate-300 dark:via-slate-200 dark:to-indigo-400 bg-clip-text text-transparent px-4">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-slate-600 to-indigo-600 dark:from-slate-400 dark:to-indigo-400 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {/* Description principale */}
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 px-4">
              {t('description')}
            </p>
            {t('detailedDescription') && t('detailedDescription') !== 'about.detailedDescription' && (
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed px-4">
                {t('detailedDescription')}
              </p>
            )}
          </motion.div>

          {/* Points clés */}
          {(() => {
            const keyPoints = safeTranslateRaw(t, 'keyPoints');
            if (Array.isArray(keyPoints) && keyPoints.length > 0) {
                return (
                  <motion.div
                    variants={itemVariants}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {(keyPoints as string[]).map((point: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
                >
                  <div className="flex items-start">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="text-3xl mr-4"
                    >
                      ✨
                    </motion.div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium text-lg flex-1">
                      {point}
                    </p>
                  </div>
                </motion.div>
                    ))}
                  </motion.div>
                );
              }
            return null;
          })()}

          {/* Section Objectifs et Valeurs */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Objectifs */}
            {t('objectives') && t('objectives') !== 'about.objectives' && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="relative bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50 dark:from-slate-900/30 dark:via-slate-800/30 dark:to-indigo-900/20 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden group"
              >
                {/* Effet de brillance au hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-500/0 via-slate-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 bg-gradient-to-r from-slate-600 to-indigo-600 dark:from-slate-500 dark:to-indigo-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg"
                    >
                      <span className="text-3xl">🎯</span>
                    </motion.div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {t('objectivesTitle') || 'Mes Objectifs'}
                    </h3>
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t('objectives')}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Valeurs */}
            {(() => {
              const values = safeTranslateRaw(t, 'values');
              if (Array.isArray(values) && values.length > 0) {
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      className="relative bg-gradient-to-br from-indigo-50 via-slate-50 to-slate-100 dark:from-indigo-900/20 dark:via-slate-800/30 dark:to-slate-900/30 rounded-3xl p-8 shadow-xl border border-indigo-200 dark:border-indigo-800 overflow-hidden group"
                    >
                      {/* Effet de brillance au hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-slate-500/10 to-slate-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center mb-6">
                          <motion.div
                            animate={{ rotate: [0, -360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-slate-600 dark:from-indigo-500 dark:to-slate-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg"
                          >
                            <span className="text-3xl">💎</span>
                          </motion.div>
                          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {t('valuesTitle') || 'Mes Valeurs'}
                          </h3>
                        </div>
                        <div className="space-y-4">
                          {(values as string[]).map((value: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="flex items-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-sm border border-white/50 dark:border-gray-700/50"
                      >
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          className="text-2xl mr-4"
                        >
                          ✨
                        </motion.span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                          {value}
                        </span>
                      </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                }
              return null;
            })()}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
