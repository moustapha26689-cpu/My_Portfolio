'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ArrowDownTrayIcon, DocumentTextIcon, EyeIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ImageModal from './ImageModal';

interface ExperienceDetail {
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

interface ExperienceDetailModalProps {
  experience: ExperienceDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExperienceDetailModal({ experience, isOpen, onClose }: ExperienceDetailModalProps) {
  const t = useTranslations('experience');
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!experience) return null;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setImageModalOpen(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-1 sm:inset-4 md:inset-8 lg:inset-16 z-50 overflow-y-auto"
          >
            <div className="min-h-full flex items-center justify-center p-2 sm:p-4">
              <motion.div
                layout
                className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
              >
                {/* Header avec gradient */}
                <div className="relative bg-gradient-to-r from-slate-700 via-slate-800 to-indigo-700 dark:from-slate-600 dark:via-slate-700 dark:to-indigo-600 p-4 sm:p-6 md:p-8">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6 text-white" />
                  </button>
                  
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 pr-10 sm:pr-12">
                    {experience.title}
                  </h2>
                  {experience.company && (
                    <p className="text-base sm:text-lg md:text-xl text-white/90">{experience.company}</p>
                  )}
                  <div className="flex flex-wrap gap-2 sm:gap-4 mt-3 sm:mt-4 text-sm sm:text-base text-white/80">
                    <span>{experience.period}</span>
                    {experience.location && <span>• {experience.location}</span>}
                  </div>
                </div>

                {/* Contenu scrollable */}
                <div className="p-4 sm:p-6 md:p-8 max-h-[calc(100vh-120px)] sm:max-h-[calc(100vh-200px)] overflow-y-auto">
                  {/* Galerie en premier pour être visible immédiatement */}
                  {((experience.images && experience.images.length > 0) || (experience.videos && experience.videos.length > 0)) && (
                    <div className="mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                        {t('gallery')}
                      </h3>
                      
                      {/* Images */}
                      {experience.images && experience.images.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {experience.images.map((image, index) => (
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
                                alt={`${experience.title} - Image ${index + 1}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                  // Masquer les images qui n'existent pas
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
                      {experience.videos && experience.videos.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {experience.videos.map((video, index) => (
                            <motion.div
                              key={`vid-${index}`}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: (experience.images?.length || 0) * 0.1 + index * 0.1 }}
                              className="relative aspect-video rounded-xl overflow-hidden group bg-black"
                            >
                              <video
                                src={video}
                                controls
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Masquer les vidéos qui n'existent pas
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

                  {/* Description détaillée */}
                  {experience.detailedDescription && (
                    <div className="mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                        {t('aboutExperience')}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        {experience.detailedDescription}
                      </p>
                    </div>
                  )}

                  {/* Description principale */}
                  {!experience.detailedDescription && (
                    <div className="mb-8">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        {experience.description}
                      </p>
                    </div>
                  )}

                  {/* Détails / Responsabilités */}
                  {experience.details && experience.details.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                        {t('mainResponsibilities')}
                      </h3>
                      <ul className="space-y-3">
                        {experience.details.map((detail, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start text-gray-700 dark:text-gray-300"
                          >
                            <span className="text-slate-600 dark:text-slate-400 mr-3 mt-1 text-xl">▸</span>
                            <span className="text-lg">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {experience.technologies && experience.technologies.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                        {t('technologiesAndTools')}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {experience.technologies.map((tech, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="px-4 py-2 bg-gradient-to-r from-slate-100 to-indigo-100 dark:from-slate-800/50 dark:to-indigo-900/30 text-slate-700 dark:text-slate-300 rounded-full text-sm font-semibold border border-slate-200 dark:border-slate-700"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Attestation de stage */}
                  {(experience.attestationUrl || experience.attestationImage) && (
                    <div className="mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white flex items-center">
                        <DocumentTextIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-slate-600 dark:text-slate-400" />
                        {t('internshipCertificate')}
                      </h3>
                      
                      {/* Boutons d'action */}
                      {experience.attestationUrl && (
                        <div className="flex flex-wrap gap-4 mb-6">
                          <a
                            href={experience.attestationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-700 to-indigo-700 hover:from-slate-800 hover:to-indigo-800 dark:from-slate-600 dark:to-indigo-600 dark:hover:from-slate-700 dark:hover:to-indigo-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                          >
                            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                            {t('downloadPdf')}
                          </a>
                          <a
                            href={experience.attestationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 border-2 border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-gray-700 rounded-lg font-semibold transition-colors"
                          >
                            <EyeIcon className="w-5 h-5 mr-2" />
                            {t('openInNewTab')}
                          </a>
                        </div>
                      )}

                      {/* Viewer PDF intégré */}
                      {experience.attestationUrl && (
                        <div className="relative w-full h-[600px] md:h-[800px] rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-lg bg-gray-100 dark:bg-gray-800">
                          <iframe
                            src={`${experience.attestationUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                            className="w-full h-full"
                            title={`Attestation - ${experience.title}`}
                          />
                        </div>
                      )}

                      {/* Image alternative si disponible */}
                      {experience.attestationImage && !experience.attestationUrl && (
                        <div className="relative w-full max-w-2xl aspect-[3/4] rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                          <Image
                            src={experience.attestationImage}
                            alt={`Attestation - ${experience.title}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Modal d'image avec zoom */}
          {experience.images && experience.images.length > 0 && (
            <ImageModal
              images={experience.images}
              videos={experience.videos || []}
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

