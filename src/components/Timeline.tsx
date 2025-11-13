'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPinIcon, CalendarIcon, BuildingOfficeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ExperienceDetailModal from './ExperienceDetailModal';
import { getExperienceImagePath } from '@/lib/imageUtils';
import { safeTranslateRaw } from '@/lib/translationUtils';

interface TimelineItem {
  title: string;
  company?: string;
  period: string;
  location?: string;
  description: string;
  detailedDescription?: string;
  details?: string[];
  images?: string[];
  videos?: string[];
  technologies?: string[];
  attestationUrl?: string;
  attestationImage?: string;
}

export default function Timeline() {
  const t = useTranslations('experience');
  const [selectedExperience, setSelectedExperience] = useState<TimelineItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Récupérer toutes les expériences depuis les traductions
  const getItems = (): TimelineItem[] => {
    const items: TimelineItem[] = [];
    const maxItems = 20; // Limite de sécurité
    for (let index = 0; index < maxItems; index++) {
      try {
        let title: string;
        try {
          title = t(`items.${index}.title`);
        } catch (error: any) {
          if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
            break;
          }
          throw error;
        }
        
        // Vérifier si la clé existe vraiment (ne pas être une clé de fallback)
        if (!title || title === `experience.items.${index}.title` || title === `items.${index}.title` || title.startsWith('items.')) {
          break;
        }
        
        let company: string;
        let period: string;
        let description: string;
        try {
          company = t(`items.${index}.company`);
          period = t(`items.${index}.period`);
          description = t(`items.${index}.description`);
          // Vérifier si les clés existent vraiment
          if (company === `experience.items.${index}.company` || company === `items.${index}.company` || company.startsWith('items.')) {
            break;
          }
          if (period === `experience.items.${index}.period` || period === `items.${index}.period` || period.startsWith('items.')) {
            break;
          }
          if (description === `experience.items.${index}.description` || description === `items.${index}.description` || description.startsWith('items.')) {
            break;
          }
        } catch (error: any) {
          if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
            break;
          }
          throw error;
        }
          
          let location: string | undefined;
          const locationRaw = safeTranslateRaw(t, `items.${index}.location`);
          if (locationRaw && typeof locationRaw === 'string' && locationRaw !== `experience.items.${index}.location`) {
            location = locationRaw;
          }
          
          // Description détaillée
          let detailedDescription: string | undefined;
          const detailedDescRaw = safeTranslateRaw(t, `items.${index}.detailedDescription`);
          if (detailedDescRaw && typeof detailedDescRaw === 'string' && detailedDescRaw !== `experience.items.${index}.detailedDescription`) {
            detailedDescription = detailedDescRaw;
          }
          
          // Récupérer les détails supplémentaires
          const details: string[] = [];
          let detailIndex = 0;
          while (detailIndex < 10) {
            const detailRaw = safeTranslateRaw(t, `items.${index}.details.${detailIndex}`);
            if (detailRaw && typeof detailRaw === 'string' && detailRaw !== `experience.items.${index}.details.${detailIndex}`) {
              details.push(detailRaw);
              detailIndex++;
            } else {
              break;
            }
          }
          
          // Récupérer les images depuis le JSON uniquement (plus de génération automatique)
          const images: string[] = [];
          let imageIndex = 0;
          while (imageIndex < 10) {
            const imageRaw = safeTranslateRaw(t, `items.${index}.images.${imageIndex}`);
            if (imageRaw && typeof imageRaw === 'string' && imageRaw !== `experience.items.${index}.images.${imageIndex}`) {
              images.push(imageRaw);
              imageIndex++;
            } else {
              break;
            }
          }
          
          // Attestation (manuelle ou automatique)
          let attestationUrl: string | undefined;
          let attestationImage: string | undefined;
          
          const attUrlRaw = safeTranslateRaw(t, `items.${index}.attestationUrl`);
          if (attUrlRaw && typeof attUrlRaw === 'string' && attUrlRaw !== `experience.items.${index}.attestationUrl`) {
            attestationUrl = attUrlRaw;
          } else if (company) {
            // Générer automatiquement le chemin de l'attestation PDF
            attestationUrl = `/images/attestations/${company.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/attestation.pdf`;
          }
          
          const attImgRaw = safeTranslateRaw(t, `items.${index}.attestationImage`);
          if (attImgRaw && typeof attImgRaw === 'string' && attImgRaw !== `experience.items.${index}.attestationImage`) {
            attestationImage = attImgRaw;
          } else if (company) {
            // Générer automatiquement le chemin de l'image d'attestation
            attestationImage = getExperienceImagePath(company, 'attestation');
          }
          
          // Récupérer les vidéos
          const videos: string[] = [];
          let videoIndex = 0;
          while (videoIndex < 10) {
            const videoRaw = safeTranslateRaw(t, `items.${index}.videos.${videoIndex}`);
            if (videoRaw && typeof videoRaw === 'string' && videoRaw !== `experience.items.${index}.videos.${videoIndex}`) {
              videos.push(videoRaw);
              videoIndex++;
            } else {
              break;
            }
          }
          
          // Récupérer les technologies
          const technologies: string[] = [];
          let techIndex = 0;
          while (techIndex < 10) {
            const techRaw = safeTranslateRaw(t, `items.${index}.technologies.${techIndex}`);
            if (techRaw && typeof techRaw === 'string' && techRaw !== `experience.items.${index}.technologies.${techIndex}`) {
              technologies.push(techRaw);
              techIndex++;
            } else {
              break;
            }
          }
          
          items.push({
            title,
            company,
            period,
            location,
            description,
            detailedDescription,
            details: details.length > 0 ? details : undefined,
            images: images.length > 0 ? images : undefined,
            videos: videos.length > 0 ? videos : undefined,
            technologies: technologies.length > 0 ? technologies : undefined,
            attestationUrl,
            attestationImage,
          });
      } catch (error: any) {
        // Si l'erreur est MISSING_MESSAGE pour le titre, on a atteint la fin
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

  const handleExperienceClick = (experience: TimelineItem) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="experience" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black relative overflow-hidden">
        {/* Effet de fond décoratif */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-700 to-indigo-700 dark:from-slate-300 dark:to-indigo-400 bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('clickForDetails')}
            </p>
          </motion.div>

          <div className="relative">
            {/* Ligne verticale de la timeline */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-500 via-slate-600 to-indigo-600 dark:from-slate-400 dark:via-slate-500 dark:to-indigo-500 transform md:-translate-x-1/2 rounded-full" />

            <div className="space-y-12">
              {items.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex items-center ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Point sur la timeline */}
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                      <motion.div
                        whileHover={{ scale: 1.5 }}
                        className="w-6 h-6 bg-gradient-to-r from-slate-600 to-indigo-600 dark:from-slate-500 dark:to-indigo-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
                      />
                    </div>

                    {/* Carte d'expérience */}
                    <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                      <motion.div
                        whileHover={{ y: -8, scale: 1.02 }}
                        onClick={() => handleExperienceClick(item)}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer group"
                      >
                        {/* En-tête de la carte */}
                        <div className="p-6 bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-900/20 dark:to-indigo-900/20 group-hover:from-slate-100 group-hover:to-indigo-100 dark:group-hover:from-slate-900/30 dark:group-hover:to-indigo-900/30 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                                  {item.title}
                                </h3>
                                <ChevronRightIcon className="w-6 h-6 text-gray-400 group-hover:text-slate-600 dark:group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                              </div>
                              {item.company && (
                                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                                  <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                                  <span className="font-semibold">{item.company}</span>
                                </div>
                              )}
                              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <CalendarIcon className="w-4 h-4 mr-1" />
                                  {item.period}
                                </div>
                                {item.location && (
                                  <div className="flex items-center">
                                    <MapPinIcon className="w-4 h-4 mr-1" />
                                    {item.location}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Contenu principal */}
                        <div className="p-6">
                          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                            {item.description}
                          </p>

                          {/* Technologies utilisées (aperçu) */}
                          {item.technologies && item.technologies.length > 0 && (
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-2">
                              {item.technologies.slice(0, 3).map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {item.technologies.length > 3 && (
                                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium">
                                    +{item.technologies.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Indicateur pour voir plus */}
                          <div className="flex items-center text-slate-700 dark:text-slate-300 font-semibold text-sm group-hover:text-slate-800 dark:group-hover:text-slate-200">
                            <span>Voir les détails</span>
                            <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Modal de détails */}
      <ExperienceDetailModal
        experience={selectedExperience}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
