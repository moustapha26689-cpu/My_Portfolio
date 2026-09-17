'use client';

import { useTranslations, useMessages } from 'next-intl';
import { motion } from 'framer-motion';
import React from 'react';

// Custom high-resolution vector logos for each skill
function SkillIcon({ skillKey }: { skillKey: string }) {
  const normalized = skillKey.toLowerCase();

  // Pennylane Official Logo (Blue stylized P ribbon)
  if (normalized.includes('pennylane')) {
    return (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 32 32" fill="none">
        <path d="M7 6C7 4.89543 7.89543 4 9 4H18.5C22.6421 4 26 7.35786 26 11.5C26 15.6421 22.6421 19 18.5 19H13V26C13 27.1046 12.1046 28 11 28H9C7.89543 28 7 27.1046 7 26V6Z" fill="#1D4ED8" />
        <circle cx="18.5" cy="11.5" r="3.5" fill="#60A5FA" />
      </svg>
    );
  }

  // Microsoft Excel Official Colors (Green spreadsheet with X)
  if (normalized.includes('excel')) {
    return (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 32 32" fill="none">
        <rect x="5" y="4" width="22" height="24" rx="4" fill="#107C41" />
        <path d="M12 10L16 16L12 22H14.5L17.2 17.5L20 22H22.5L18.5 16L22.5 10H20L17.2 14.5L14.5 10H12Z" fill="white" />
      </svg>
    );
  }

  // Microsoft Power BI Official Colors (Gold/Yellow bar chart)
  if (normalized.includes('power bi')) {
    return (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 32 32" fill="none">
        <rect x="7" y="16" width="4" height="11" rx="1.5" fill="#F2C811" />
        <rect x="14" y="11" width="4" height="16" rx="1.5" fill="#F2C811" />
        <rect x="21" y="6" width="4" height="21" rx="1.5" fill="#E89B00" />
      </svg>
    );
  }

  // Facturation électronique / E-Invoicing
  if (normalized.includes('factur') || normalized.includes('invoic')) {
    return (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="4" width="20" height="24" rx="3" stroke="#2563EB" strokeWidth="2" fill="#EFF6FF" />
        <path d="M11 10H21M11 15H17M11 20H19" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="21" cy="21" r="5" fill="#10B981" />
        <path d="M19.5 21L20.5 22L22.5 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Référentiel Comptable Français / French Accounting Standards
  if (normalized.includes('r?f?rentiel') || normalized.includes('standard') || normalized.includes('norme') || normalized.includes('pcg')) {
    return (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 32 32" fill="none">
        <path d="M7 6C7 4.89543 7.89543 4 9 4H23C24.1046 4 25 4.89543 25 6V26C25 27.1046 24.1046 28 23 28H9C7.89543 28 7 27.1046 7 26V6Z" fill="#1E293B" />
        <rect x="10" y="8" width="12" height="2" rx="1" fill="#38BDF8" />
        <rect x="10" y="13" width="8" height="2" rx="1" fill="#94A3B8" />
        <path d="M16 18L13 23H19L16 18Z" fill="#F59E0B" />
      </svg>
    );
  }

  // Fiscalité d'entreprise / Corporate Taxation
  if (normalized.includes('fiscal') || normalized.includes('tax')) {
    return (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L6 8V16C6 22 10.5 26.5 16 28C21.5 26.5 26 22 26 16V8L16 4Z" fill="#7C3AED" />
        <path d="M13 14H19M16 11V21" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Comptabilité / Accounting / Bookkeeping
  if (normalized.includes('compta') || normalized.includes('account')) {
    return (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 32 32" fill="none">
        <rect x="5" y="5" width="22" height="22" rx="4" fill="#0EA5E9" />
        <path d="M10 11H22M10 16H22M10 21H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Analyse financière / Financial Analysis
  if (normalized.includes('analyse') || normalized.includes('analys')) {
    return (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 32 32" fill="none">
        <rect x="5" y="5" width="22" height="22" rx="4" fill="#6366F1" />
        <path d="M9 21L14 15L18 18L23 11" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="23" cy="11" r="2" fill="#FDE047" />
      </svg>
    );
  }

  // Contrôles internes / Internal Controls / Audit
  if (normalized.includes('contr') || normalized.includes('audit')) {
    return (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="#059669" strokeWidth="2.5" fill="#ECFDF5" />
        <path d="M11 16L14.5 19.5L21 13" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Intégration de données / Data Integration / ETL
  if (normalized.includes('donn') || normalized.includes('data')) {
    return (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="9" rx="9" ry="4" fill="#3B82F6" />
        <path d="M7 9V16C7 18.2 11 20 16 20C21 20 25 18.2 25 16V9" stroke="#1D4ED8" strokeWidth="2" fill="none" />
        <path d="M7 16V23C7 25.2 11 27 16 27C21 27 25 25.2 25 23V16" stroke="#1D4ED8" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  // Business Financing / Financement
  if (normalized.includes('financing') || normalized.includes('financ')) {
    return (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" fill="#EAB308" />
        <path d="M16 10V22M12.5 13C12.5 13 14 11.5 16 11.5C18 11.5 19.5 12.5 19.5 14C19.5 16 12.5 16.5 12.5 18.5C12.5 20 14 21 16 21C18 21 19.5 19.5 19.5 19.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Generic Finance
  return (
    <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 32 32" fill="none">
      <rect x="5" y="5" width="22" height="22" rx="5" fill="#4F46E5" />
      <path d="M10 16H22M16 10V22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function SkillGrid() {
  const t = useTranslations('skills');
  const messages = useMessages() as Record<string, any>;
  
  // Safely retrieve items array directly from locale messages dictionary
  const rawItems = messages?.skills?.items;
  const skillsList: Array<{ name: string; level?: string | number }> = Array.isArray(rawItems)
    ? rawItems
    : [];

  return (
    <section 
      id="skills" 
      className="py-20 md:py-32 relative overflow-hidden" 
      style={{
        background: 'linear-gradient(180deg, #24056d 0%, #30088e 50%, #1d0356 100%)'
      }}
    >
      {/* Subtle decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6366f1]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-3">
            {t('title', { defaultValue: 'Compétences' })}
          </h2>
          <div className="w-20 sm:w-24 h-1.5 bg-[#f59e0b] mx-auto rounded-full mb-3" />
          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            {messages?.skills?.subtitle || 'Expertise technique, référentiel comptable et solutions FinTech'}
          </p>
        </motion.div>

        {/* 12 Skills Grid (Responsive 2-col on mobile, 3-col on tablet, 4-col on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {skillsList.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group bg-[#0d092b] hover:bg-[#150f44] border border-white/10 hover:border-[#f59e0b]/70 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-[0_10px_30px_rgba(245,158,11,0.22)] transition-all duration-300 cursor-default"
            >
              {/* White Circular Badge */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-md flex items-center justify-center p-3 sm:p-3.5 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <SkillIcon skillKey={skill.name} />
              </div>

              {/* Skill Name */}
              <h3 className="text-white font-extrabold text-xs sm:text-sm md:text-base leading-snug tracking-wide group-hover:text-amber-300 transition-colors">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
