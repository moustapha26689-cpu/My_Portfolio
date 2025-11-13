'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { XMarkIcon, MapPinIcon, CalendarIcon, BuildingOfficeIcon, ChevronRightIcon, VideoCameraIcon, EyeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import ImageModal from './ImageModal';
import { safeTranslateRaw } from '@/lib/translationUtils';

interface Volunteer {
  role: string;
  organization: string;
  period: string;
  description: string;
  category?: string;
  detailedDescription?: string;
  images?: string[];
  videos?: string[];
  achievements?: string[];
}

interface VolunteerDetailModalProps {
  volunteer: Volunteer | null;
  isOpen: boolean;
  onClose: () => void;
}

function VolunteerDetailModal({ volunteer, isOpen, onClose }: VolunteerDetailModalProps) {
  const t = useTranslations('volunteer');
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!volunteer) return null;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setImageModalOpen(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-1 sm:inset-4 md:inset-8 lg:inset-16 z-50 overflow-y-auto"
          >
            <div className="min-h-full flex items-center justify-center p-2 sm:p-4">
              <motion.div className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
                <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-4 sm:p-6 md:p-8">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </button>
                  
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 pr-10 sm:pr-12">
                    {volunteer.role}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-white/90">{volunteer.organization}</p>
                  <div className="flex flex-wrap gap-2 sm:gap-4 mt-3 sm:mt-4 text-sm sm:text-base text-white/80">
                    <span>{volunteer.period}</span>
                    {volunteer.category && <span>• {volunteer.category}</span>}
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8 max-h-[calc(100vh-120px)] sm:max-h-[calc(100vh-200px)] overflow-y-auto">
                  {/* Galerie en premier pour être visible immédiatement */}
                  {((volunteer.images && volunteer.images.length > 0) || (volunteer.videos && volunteer.videos.length > 0)) && (
                    <div className="mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                        {t('gallery')}
                      </h3>
                      
                      {/* Images */}
                      {volunteer.images && volunteer.images.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {volunteer.images.map((image, index) => (
                            <motion.div
                              key={`img-${index}`}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              onClick={() => handleImageClick(index)}
                              className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer"
                            >
                              <Image
                                src={image}
                                alt={`${volunteer.role} - Image ${index + 1}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.parentElement?.parentElement?.remove();
                                }}
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <EyeIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Vidéos */}
                      {volunteer.videos && volunteer.videos.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {volunteer.videos.map((video, index) => (
                            <motion.div
                              key={`vid-${index}`}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: (volunteer.images?.length || 0) * 0.1 + index * 0.1 }}
                              className="relative aspect-video rounded-xl overflow-hidden group bg-black"
                            >
                              <video
                                src={video}
                                controls
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLVideoElement;
                                  target.parentElement?.remove();
                                }}
                              />
                              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center gap-1 text-sm">
                                <VideoCameraIcon className="w-4 h-4" />
                                <span>{t('video')}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {volunteer.detailedDescription && (
                    <div className="mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                        {t('aboutEngagement')}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        {volunteer.detailedDescription}
                      </p>
                    </div>
                  )}

                  {!volunteer.detailedDescription && (
                    <div className="mb-8">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        {volunteer.description}
                      </p>
                    </div>
                  )}

                  {volunteer.achievements && volunteer.achievements.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                        {t('missionsAndResponsibilities')}
                      </h3>
                      <ul className="space-y-3">
                        {volunteer.achievements.map((achievement, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start text-gray-700 dark:text-gray-300"
                          >
                            <span className="text-green-500 mr-3 mt-1 text-xl">✓</span>
                            <span className="text-lg">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Modal d'image avec zoom */}
          {volunteer.images && volunteer.images.length > 0 && (
            <ImageModal
              images={volunteer.images}
              videos={volunteer.videos || []}
              initialIndex={selectedImageIndex}
              isOpen={imageModalOpen}
              onClose={() => setImageModalOpen(false)}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}

export default function VolunteerSection() {
  const t = useTranslations('volunteer');
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Récupérer toutes les expériences de bénévolat depuis les traductions
  const getVolunteers = (): Volunteer[] => {
    const volunteers: Volunteer[] = [];
    const maxItems = 20; // Limite de sécurité
    for (let index = 0; index < maxItems; index++) {
      try {
        let role: string;
        try {
          role = t(`items.${index}.role`);
        } catch (error: any) {
          if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
            break;
          }
          throw error;
        }
        
        // Vérifier si la clé existe vraiment (ne pas être une clé de fallback)
        if (!role || role === `volunteer.items.${index}.role` || role === `items.${index}.role` || role.startsWith('items.')) {
          break;
        }
        
        let organization: string;
        let period: string;
        let description: string;
        try {
          organization = t(`items.${index}.organization`);
          period = t(`items.${index}.period`);
          description = t(`items.${index}.description`);
          // Vérifier si les clés existent vraiment
          if (organization === `volunteer.items.${index}.organization` || organization === `items.${index}.organization` || organization.startsWith('items.')) {
            break;
          }
          if (period === `volunteer.items.${index}.period` || period === `items.${index}.period` || period.startsWith('items.')) {
            break;
          }
          if (description === `volunteer.items.${index}.description` || description === `items.${index}.description` || description.startsWith('items.')) {
            break;
          }
        } catch (error: any) {
          if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
            break;
          }
          throw error;
        }
          
          let category: string | undefined;
          let detailedDescription: string | undefined;
          
          const categoryRaw = safeTranslateRaw(t, `items.${index}.category`);
          if (categoryRaw && typeof categoryRaw === 'string' && categoryRaw !== `volunteer.items.${index}.category`) {
            category = categoryRaw;
          }
          
          const detailedDescRaw = safeTranslateRaw(t, `items.${index}.detailedDescription`);
          if (detailedDescRaw && typeof detailedDescRaw === 'string' && detailedDescRaw !== `volunteer.items.${index}.detailedDescription`) {
            detailedDescription = detailedDescRaw;
          }
          
          // Récupérer les images
          const images: string[] = [];
          let imageIndex = 0;
          while (imageIndex < 10) {
            const imageRaw = safeTranslateRaw(t, `items.${index}.images.${imageIndex}`);
            if (imageRaw && typeof imageRaw === 'string' && imageRaw !== `volunteer.items.${index}.images.${imageIndex}`) {
              images.push(imageRaw);
              imageIndex++;
            } else {
              break;
            }
          }
          
          // Récupérer les vidéos
          const videos: string[] = [];
          let videoIndex = 0;
          while (videoIndex < 10) {
            const videoRaw = safeTranslateRaw(t, `items.${index}.videos.${videoIndex}`);
            if (videoRaw && typeof videoRaw === 'string' && videoRaw !== `volunteer.items.${index}.videos.${videoIndex}`) {
              videos.push(videoRaw);
              videoIndex++;
            } else {
              break;
            }
          }
          
          // Récupérer les réalisations
          const achievements: string[] = [];
          let achievementIndex = 0;
          while (achievementIndex < 10) {
            const achievementRaw = safeTranslateRaw(t, `items.${index}.achievements.${achievementIndex}`);
            if (achievementRaw && typeof achievementRaw === 'string' && achievementRaw !== `volunteer.items.${index}.achievements.${achievementIndex}`) {
              achievements.push(achievementRaw);
              achievementIndex++;
            } else {
              break;
            }
          }
          
          volunteers.push({
            role,
            organization,
            period,
            description,
            category,
            detailedDescription,
            images: images.length > 0 ? images : undefined,
            videos: videos.length > 0 ? videos : undefined,
            achievements: achievements.length > 0 ? achievements : undefined,
          });
      } catch (error: any) {
        if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
          break;
        }
        continue;
      }
    }
    return volunteers;
  };

  const volunteers = getVolunteers();

  const handleVolunteerClick = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="volunteer" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">
              Engagement & Leadership
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Mes expériences d'engagement associatif et de leadership
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteers.map((volunteer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => handleVolunteerClick(volunteer)}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer group"
              >
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 group-hover:from-green-100 group-hover:to-emerald-100 dark:group-hover:from-green-900/30 dark:group-hover:to-emerald-900/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors flex-1">
                      {volunteer.role}
                    </h3>
                    <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                    <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{volunteer.organization}</span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-500 text-sm">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {volunteer.period}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                    {volunteer.description}
                  </p>
                  {volunteer.category && (
                    <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                      {volunteer.category}
                    </span>
                  )}
                  <div className="flex items-center text-green-600 dark:text-green-400 font-semibold text-sm mt-4">
                    <span>Voir les détails</span>
                    <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <VolunteerDetailModal
        volunteer={selectedVolunteer}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
