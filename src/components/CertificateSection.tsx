'use client';

import { useTranslations, useMessages } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { XMarkIcon, DocumentCheckIcon, ArrowTopRightOnSquareIcon, EyeIcon } from '@heroicons/react/24/outline';

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  documentUrl?: string;
  skills?: string;
}

export default function CertificateSection() {
  const t = useTranslations('certifications');
  const messages = useMessages() as Record<string, any>;
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const rawItems = messages?.certifications?.items;
  const items: Certificate[] = Array.isArray(rawItems) ? rawItems : [];

  // Direct map to official certification PDFs in public/
  const certPdfs: Record<number, string> = {
    0: '/images/certifications/pennylane/specialiste-facture-electronique.pdf',
    1: '/images/certifications/pennylane/interface-comptabilite.pdf',
    2: '/images/certifications/linkedin-excel/certificate.pdf',
    3: '/images/certifications/linkedin-finance/certificate.pdf',
    4: '/images/certifications/ef-set/certificate.pdf',
  };

  return (
    <section id="certifications" className="py-24 md:py-32 bg-slate-50 dark:bg-[#0a0720] transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
            <DocumentCheckIcon className="w-7 h-7" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            {t('title', { defaultValue: 'Certifications' })}
          </h2>
          <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mb-3" />
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-lg mx-auto font-medium">
            {messages?.certifications?.subtitle || 'Diplômes professionnels vérifiés et accréditations logicielles'}
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {items.map((cert, index) => {
            const pdfUrl = cert.documentUrl || certPdfs[index];
            const isPennylane = cert.issuer?.toLowerCase().includes('pennylane');

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className={`bg-white dark:bg-[#100b2e] rounded-3xl p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 border ${
                  isPennylane 
                    ? 'border-blue-400/40 dark:border-blue-500/30 ring-1 ring-blue-400/20' 
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      {cert.date}
                    </span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      {cert.issuer}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-snug mb-3">
                    {cert.name}
                  </h3>

                  {cert.skills && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-4 leading-relaxed">
                      {cert.skills}
                    </p>
                  )}
                </div>

                <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  {pdfUrl ? (
                    <button
                      onClick={() => setSelectedDoc(pdfUrl)}
                      className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#4a00e0] dark:text-purple-400 hover:text-amber-500 transition-colors"
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span>{t('preview', { defaultValue: 'Aperçu PDF' })}</span>
                    </button>
                  ) : <div />}

                  {cert.credentialId && (
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                      ID: {cert.credentialId.substring(0, 10)}...
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* PDF Modal Viewer */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
            onClick={() => setSelectedDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#0c0827] w-full max-w-5xl h-[85vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-slate-700"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                  {t('document', { defaultValue: 'Certificat Officiel' })}
                </h3>
                <div className="flex items-center gap-4">
                  <a 
                    href={selectedDoc} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-500 hover:text-amber-600 transition-colors"
                  >
                    <span>{t('openTab', { defaultValue: 'Ouvrir dans un onglet' })}</span>
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                  <button 
                    onClick={() => setSelectedDoc(null)}
                    className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-slate-100 dark:bg-black/60 p-2 sm:p-4">
                <iframe 
                  src={selectedDoc.endsWith('.pdf') ? `${selectedDoc}#toolbar=0` : selectedDoc} 
                  className="w-full h-full rounded-2xl bg-white" 
                  title="Document Preview" 
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
