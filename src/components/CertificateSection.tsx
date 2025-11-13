'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { DocumentIcon, XMarkIcon, ArrowDownTrayIcon, EyeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import ImageModal from './ImageModal';
import { safeTranslateRaw } from '@/lib/translationUtils';

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills?: string;
  documentUrl?: string;
  imageUrl?: string;
}

export default function CertificateSection() {
  const t = useTranslations('certifications');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  // Récupérer toutes les certifications depuis les traductions
  const getCertificates = (): Certificate[] => {
    const certificates: Certificate[] = [];
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
        if (!name || name === `certifications.items.${index}.name` || name === `items.${index}.name` || name.startsWith('items.')) {
          break;
        }
        
        let issuer: string;
        let date: string;
        try {
          issuer = t(`items.${index}.issuer`);
          date = t(`items.${index}.date`);
          // Vérifier si les clés existent vraiment
          if (issuer === `certifications.items.${index}.issuer` || issuer === `items.${index}.issuer` || issuer.startsWith('items.')) {
            break;
          }
          if (date === `certifications.items.${index}.date` || date === `items.${index}.date` || date.startsWith('items.')) {
            break;
          }
        } catch (error: any) {
          if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
            break;
          }
          throw error;
        }
          
          let credentialId: string | undefined;
          let skills: string | undefined;
          let documentUrl: string | undefined;
          let imageUrl: string | undefined;
          
          const credentialIdRaw = safeTranslateRaw(t, `items.${index}.credentialId`);
          if (credentialIdRaw && typeof credentialIdRaw === 'string' && credentialIdRaw !== `certifications.items.${index}.credentialId`) {
            credentialId = credentialIdRaw;
          }
          
          const skillsRaw = safeTranslateRaw(t, `items.${index}.skills`);
          if (skillsRaw && typeof skillsRaw === 'string' && skillsRaw !== `certifications.items.${index}.skills`) {
            skills = skillsRaw;
          }
          
          const docUrlRaw = safeTranslateRaw(t, `items.${index}.documentUrl`);
          if (docUrlRaw && typeof docUrlRaw === 'string' && docUrlRaw !== `certifications.items.${index}.documentUrl`) {
            documentUrl = docUrlRaw;
          }
          
          const imgUrlRaw = safeTranslateRaw(t, `items.${index}.imageUrl`);
          if (imgUrlRaw && typeof imgUrlRaw === 'string' && imgUrlRaw !== `certifications.items.${index}.imageUrl`) {
            imageUrl = imgUrlRaw;
          }
          
          certificates.push({
            name,
            issuer,
            date,
            credentialId,
            skills,
            documentUrl,
            imageUrl,
          });
      } catch (error: any) {
        if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
          break;
        }
        continue;
      }
    }
    return certificates;
  };

  const certificates = getCertificates();

  const handleCertificateClick = (cert: Certificate) => {
    setSelectedCertificate(cert);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="certifications" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-700 to-indigo-700 dark:from-slate-300 dark:to-indigo-400 bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Cliquez sur une certification pour voir le document
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => handleCertificateClick(cert)}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 p-6 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
                      {cert.issuer}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {cert.date}
                    </p>
                  </div>
                  <DocumentIcon className="w-8 h-8 text-slate-600 dark:text-slate-400 group-hover:scale-110 transition-transform" />
                </div>
                {cert.skills && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                    {cert.skills}
                  </p>
                )}
                <div className="flex items-center text-slate-700 dark:text-slate-300 text-sm font-semibold">
                  <EyeIcon className="w-4 h-4 mr-2" />
                  <span>Voir le document</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal pour afficher le document */}
      <AnimatePresence>
        {isModalOpen && selectedCertificate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-y-auto"
            >
              <div className="min-h-full flex items-center justify-center p-4">
                <motion.div className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="relative bg-gradient-to-r from-slate-700 via-slate-800 to-indigo-700 dark:from-slate-600 dark:via-slate-700 dark:to-indigo-600 p-6">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                    >
                      <XMarkIcon className="w-6 h-6 text-white" />
                    </button>
                    <h2 className="text-2xl font-bold text-white mb-2 pr-12">
                      {selectedCertificate.name}
                    </h2>
                    <p className="text-white/90">{selectedCertificate.issuer}</p>
                    <p className="text-white/80 text-sm mt-1">{selectedCertificate.date}</p>
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    {/* Bouton de téléchargement */}
                    {selectedCertificate.documentUrl && (
                      <div className="mb-6 flex gap-4">
                        <a
                          href={selectedCertificate.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                        >
                          <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                          Télécharger le PDF
                        </a>
                        <a
                          href={selectedCertificate.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 border-2 border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-gray-700 rounded-lg font-semibold transition-colors"
                        >
                          <EyeIcon className="w-5 h-5 mr-2" />
                          Ouvrir dans un nouvel onglet
                        </a>
                      </div>
                    )}
                    
                    {/* Viewer PDF intégré */}
                    {selectedCertificate.documentUrl && (
                      <div className="relative w-full h-[600px] md:h-[800px] rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-lg bg-gray-100 dark:bg-gray-800">
                        <iframe
                          src={`${selectedCertificate.documentUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                          className="w-full h-full"
                          title={selectedCertificate.name}
                        />
                      </div>
                    )}

                    {/* Image alternative si disponible */}
                    {selectedCertificate.imageUrl && !selectedCertificate.documentUrl && (
                      <div 
                        onClick={() => setImageModalOpen(true)}
                        className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer group"
                      >
                        <Image
                          src={selectedCertificate.imageUrl}
                          alt={selectedCertificate.name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <EyeIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    )}

                    {/* Message si aucun document */}
                    {!selectedCertificate.documentUrl && !selectedCertificate.imageUrl && (
                      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <DocumentIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Aucun document disponible pour le moment</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Modal d'image avec zoom pour les certifications */}
            {selectedCertificate.imageUrl && (
              <ImageModal
                images={[selectedCertificate.imageUrl]}
                videos={[]}
                initialIndex={0}
                isOpen={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
