'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { safeTranslateRaw } from '@/lib/translationUtils';

interface Skill {
  name: string;
  level: number; // 1-5
  icon?: string;
}

const skillEmojis: { [key: string]: string } = {
  // Comptabilité - Livre de comptes
  'Comptabilité': '📒',
  'Accounting': '📒',
  
  // Analyse financière - Graphique analytique
  'Analyse financière': '📊',
  'Financial Analysis': '📊',
  
  // Contrôles internes - Loupe/vérification
  'Contrôles internes': '🔍',
  'Internal Controls': '🔍',
  
  // Microsoft Excel - Fichier Excel
  'Microsoft Excel': '📗',
  
  // Microsoft Power BI - Graphiques et données
  'Microsoft Power BI': '📈',
  
  // Intégration de données - Base de données
  'Intégration de données': '💾',
  'Data Integration': '💾',
  
  // Business Financing - Argent/billets
  'Business Financing': '💵',
  
  // Finance - Pièces d'argent
  'Finance': '💰',
};


export default function SkillGrid() {
  const t = useTranslations('skills');
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  // Récupérer toutes les compétences depuis les traductions
  const getSkills = (): Skill[] => {
    const skills: Skill[] = [];
    const maxItems = 20; // Limite de sécurité
    for (let index = 0; index < maxItems; index++) {
      try {
        let name: string;
        try {
          name = t(`items.${index}.name`);
        } catch (error: any) {
          if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
            break;
          }
          throw error;
        }
        
        // Vérifier si la clé existe vraiment (ne pas être une clé de fallback)
        if (!name || name === `skills.items.${index}.name` || name === `items.${index}.name` || name.startsWith('items.')) {
          break;
        }
        
        let level: number;
        try {
          const levelStr = t(`items.${index}.level`, { defaultValue: '5' });
          // Vérifier si c'est une clé manquante
          if (levelStr === `skills.items.${index}.level` || levelStr === `items.${index}.level` || levelStr.startsWith('items.')) {
            break;
          }
          level = parseInt(levelStr) || 5;
        } catch (error: any) {
          if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
            break;
          }
          throw error;
        }
        
        skills.push({ 
          name, 
          level: Math.min(Math.max(level, 1), 5),
          icon: skillEmojis[name] || '⭐'
        });
      } catch (error: any) {
        if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
          break;
        }
        continue;
      }
    }
    return skills;
  };

  const skills = getSkills();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black relative overflow-hidden">
      {/* Effets de fond animés */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-600/10 dark:bg-slate-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-700 via-slate-800 to-indigo-700 dark:from-slate-300 dark:via-slate-200 dark:to-indigo-400 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Mes compétences techniques et professionnelles
          </p>
        </motion.div>

        {/* Design créatif avec cartes flottantes en mouvement */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {skills.map((skill, index) => {
            const SkillCard = () => {
              const ref = useRef<HTMLDivElement>(null);
              const x = useMotionValue(0);
              const y = useMotionValue(0);
              
              const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
              const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });
              
              const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
              const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

              const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                if (!ref.current) return;
                const rect = ref.current.getBoundingClientRect();
                const width = rect.width;
                const height = rect.height;
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                const xPct = mouseX / width - 0.5;
                const yPct = mouseY / height - 0.5;
                x.set(xPct);
                y.set(yPct);
              };

              const handleMouseLeave = () => {
                x.set(0);
                y.set(0);
              };

              return (
                <motion.div
                  ref={ref}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  className="relative group cursor-pointer"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3 + index * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative h-64 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden p-6"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Effet de brillance */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-500/0 via-slate-500/20 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icône emoji flottante */}
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-6xl mb-4 text-center flex items-center justify-center"
                      style={{ transform: "translateZ(50px)" }}
                    >
                      <span>{skill.icon}</span>
                    </motion.div>

                    {/* Nom */}
                    <h3
                      className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      {skill.name}
                    </h3>

                    {/* Barre de progression circulaire */}
                    <div className="relative w-32 h-32 mx-auto" style={{ transform: "translateZ(40px)" }}>
                      <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 120 120">
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-gray-200 dark:text-gray-800"
                        />
                        <motion.circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="url(#skillGradient)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={314}
                          initial={{ strokeDashoffset: 314 }}
                          whileInView={{ strokeDashoffset: 314 - (skill.level / 5) * 314 }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, delay: index * 0.1, ease: "easeOut" }}
                        />
                        <defs>
                          <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-slate-600 to-indigo-600 dark:from-slate-400 dark:to-indigo-400 bg-clip-text text-transparent">
                          {skill.level}/5
                        </span>
                      </div>
                    </div>

                    {/* Points décoratifs flottants */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          x: [0, Math.random() * 20 - 10],
                          y: [0, Math.random() * 20 - 10],
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                          duration: 2 + i,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute w-2 h-2 bg-slate-500 dark:bg-slate-400 rounded-full"
                        style={{
                          top: `${20 + i * 30}%`,
                          left: `${10 + i * 20}%`,
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              );
            };

            return <SkillCard key={index} />;
          })}
        </motion.div>
      </div>
    </section>
  );
}
