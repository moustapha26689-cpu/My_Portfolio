'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AcademicCapIcon, CalendarIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { safeTranslateRaw } from '@/lib/translationUtils';

interface EducationItem {
  degree: string;
  school: string;
  period: string;
  grade?: string;
  activities?: string;
  note?: string;
}

export default function Education() {
  const t = useTranslations('education');

  // Récupérer toutes les formations depuis les traductions
  const getItems = (): EducationItem[] => {
    const items: EducationItem[] = [];
    const maxItems = 10; // Limite de sécurité
    for (let index = 0; index < maxItems; index++) {
      try {
        let degree: string;
        try {
          degree = t(`items.${index}.degree`);
        } catch (error: any) {
          if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
            break;
          }
          throw error;
        }
        
        // Vérifier si la clé existe vraiment (ne pas être une clé de fallback)
        if (!degree || degree === `education.items.${index}.degree` || degree === `items.${index}.degree` || degree.startsWith('items.')) {
          break;
        }
        
        let school: string;
        let period: string;
        try {
          school = t(`items.${index}.school`);
          period = t(`items.${index}.period`);
          // Vérifier si les clés existent vraiment
          if (school === `education.items.${index}.school` || school === `items.${index}.school` || school.startsWith('items.')) {
            break;
          }
          if (period === `education.items.${index}.period` || period === `items.${index}.period` || period.startsWith('items.')) {
            break;
          }
        } catch (error: any) {
          if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
            break;
          }
          throw error;
        }
          
          let grade: string | undefined;
          let activities: string | undefined;
          let note: string | undefined;
          
          // Utiliser safeTranslateRaw pour éviter les erreurs
          const gradeRaw = safeTranslateRaw(t, `items.${index}.grade`);
          if (gradeRaw && typeof gradeRaw === 'string' && gradeRaw !== `education.items.${index}.grade`) {
            grade = gradeRaw;
          }
          
          const activitiesRaw = safeTranslateRaw(t, `items.${index}.activities`);
          if (activitiesRaw && typeof activitiesRaw === 'string' && activitiesRaw !== `education.items.${index}.activities`) {
            activities = activitiesRaw;
          }
          
          const noteRaw = safeTranslateRaw(t, `items.${index}.note`);
          if (noteRaw && typeof noteRaw === 'string' && noteRaw !== `education.items.${index}.note`) {
            note = noteRaw;
          }
          
          items.push({
            degree,
            school,
            period,
            grade,
            activities,
            note,
          });
      } catch (error: any) {
        // Si l'erreur est MISSING_MESSAGE pour le degree, on a atteint la fin
        if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
          break;
        }
        // Sinon, continuer avec l'index suivant
        continue;
      }
    }
    return items;
  };

  const items = getItems();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <section id="education" className="py-24 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black relative overflow-hidden">
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
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400 dark:to-teal-400">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto rounded-full" />
        </motion.div>

        {/* Grille de cartes modernes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* Carte principale */}
              <div className="relative h-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Bande décorative en haut */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />
                
                {/* Contenu */}
                <div className="p-8">
                  {/* En-tête avec icône */}
                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                      className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                    >
                      <AcademicCapIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </motion.div>
                    
                    {item.grade && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full border border-green-200 dark:border-green-800"
                      >
                        <TrophyIcon className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                        <span className="text-sm font-bold text-green-700 dark:text-green-300">
                          {item.grade}
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Diplôme */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {item.degree}
                  </h3>

                  {/* École */}
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                    <AcademicCapIcon className="w-5 h-5 mr-2 text-green-500" />
                    <span className="font-semibold text-lg">{item.school}</span>
                  </div>

                  {/* Période */}
                  <div className="flex items-center text-gray-500 dark:text-gray-500 mb-6">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm">{item.period}</span>
                  </div>

                  {/* Note si disponible */}
                  {item.note && (
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1 text-xl">💡</span>
                        <p className="text-sm italic text-gray-600 dark:text-gray-400">
                          {item.note}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Effet de brillance au hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Points décoratifs animés */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      x: [0, Math.random() * 30 - 15],
                      y: [0, Math.random() * 30 - 15],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute w-2 h-2 bg-green-500 rounded-full"
                    style={{
                      top: `${20 + i * 25}%`,
                      right: `${10 + i * 15}%`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
