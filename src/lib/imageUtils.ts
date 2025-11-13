/**
 * Utilitaires pour la gestion automatique des images
 */

/**
 * Retourne une URL d'icône professionnelle pour une compétence
 * Utilise des icônes de haute qualité depuis Simple Icons CDN
 */
export function getProfessionalSkillIcon(skillName: string): string {
  const professionalIcons: { [key: string]: string } = {
    // Comptabilité - Sage ou Xero (logiciels comptables professionnels) - meilleure représentation que QuickBooks
    'Comptabilité': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/xero.svg',
    'Accounting': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/xero.svg',
    
    // Analyse financière - Chart.js (visualisation de données financières)
    'Analyse financière': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/chartdotjs.svg',
    'Financial Analysis': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/chartdotjs.svg',
    
    // Contrôles internes - Shield avec checkmark (sécurité et conformité)
    'Contrôles internes': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/shieldcheckmark.svg',
    'Internal Controls': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/shieldcheckmark.svg',
    
    // Microsoft Excel - Icône officielle Excel
    'Microsoft Excel': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftexcel.svg',
    
    // Microsoft Power BI - Icône officielle Power BI
    'Microsoft Power BI': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/powerbi.svg',
    
    // Intégration de données - Azure (cloud et intégration de données)
    'Intégration de données': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftazure.svg',
    'Data Integration': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftazure.svg',
    
    // Business Financing - Visa (financement et paiements)
    'Business Financing': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/visa.svg',
    
    // Finance - Visa (représente le secteur financier)
    'Finance': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/visa.svg',
  };

  return professionalIcons[skillName] || getSkillIconPath(skillName);
}

/**
 * Génère le chemin d'une image de compétence (pour fichiers locaux)
 */
export function getSkillIconPath(skillName: string): string {
  // Mapping des noms de compétences vers les noms de fichiers
  const skillFileMap: { [key: string]: string } = {
    'Comptabilité': 'comptabilite',
    'Accounting': 'comptabilite',
    'Analyse financière': 'analyse-financiere',
    'Financial Analysis': 'analyse-financiere',
    'Contrôles internes': 'controles-internes',
    'Internal Controls': 'controles-internes',
    'Microsoft Excel': 'microsoft-excel',
    'Microsoft Power BI': 'microsoft-power-bi',
    'Intégration de données': 'integration-donnees',
    'Data Integration': 'integration-donnees',
    'Business Financing': 'business-financing',
    'Finance': 'finance',
  };

  const fileName = skillFileMap[skillName] || skillName.toLowerCase().replace(/\s+/g, '-');
  
  // Cherche d'abord SVG, puis PNG, puis JPG
  return `/images/skills/${fileName}.svg`;
}

/**
 * Génère le chemin d'une image d'expérience basé sur le nom de l'entreprise
 */
export function getExperienceImagePath(company: string, imageType: 'entreprise' | 'moi' | 'attestation', index?: number): string {
  // Normaliser le nom de l'entreprise pour le chemin
  const companySlug = company
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  
  const indexSuffix = index !== undefined ? `-${index}` : '';
  
  if (imageType === 'attestation') {
    return `/images/experiences/${companySlug}/attestation.jpg`;
  }
  
  return `/images/experiences/${companySlug}/${imageType}${indexSuffix}.jpg`;
}

/**
 * Génère le chemin d'une image de bénévolat
 */
export function getVolunteerImagePath(organization: string, imageType: 'evenement' | 'moi', index?: number): string {
  // Normaliser le nom de l'organisation
  const orgSlug = organization
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .substring(0, 30); // Limiter la longueur
  
  const indexSuffix = index !== undefined ? `-${index}` : '';
  
  return `/images/volunteer/${orgSlug}/${imageType}${indexSuffix}.jpg`;
}

/**
 * Génère le chemin d'une certification
 */
export function getCertificationImagePath(certName: string): string {
  const certSlug = certName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .substring(0, 30);
  
  return `/images/certifications/${certSlug}/certificate.jpg`;
}

/**
 * Génère le chemin de l'image de profil
 * Cherche d'abord .jpg, puis .jpeg, puis .png
 */
export function getProfileImagePath(): string {
  // Le code essaiera d'abord profile.jpg, puis profile.jpeg si la première n'existe pas
  // Next.js Image component gère automatiquement le fallback
  return '/images/profile/profile.jpg';
}
