'use client';

import { useTranslations } from 'next-intl';
import { safeTranslateRaw } from '@/lib/translationUtils';

interface Award {
  title: string;
  organization: string;
  date: string;
  description?: string;
}

export default function AwardSection() {
  const t = useTranslations('awards');

  // Récupérer toutes les récompenses depuis les traductions
  const getAwards = (): Award[] => {
    const awards: Award[] = [];
    const maxItems = 20; // Limite de sécurité
    for (let index = 0; index < maxItems; index++) {
      try {
        // Essayer d'accéder à la clé title - si elle n'existe pas, on arrête
        let title: string;
        try {
          title = t(`items.${index}.title`);
        } catch (error: any) {
          if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
            break;
          }
          throw error;
        }
        
        // Si title existe, récupérer les autres champs obligatoires
        let organization: string;
        let date: string;
        try {
          organization = t(`items.${index}.organization`);
          date = t(`items.${index}.date`);
        } catch (error: any) {
          if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
            break;
          }
          throw error;
        }
        
        let description: string | undefined;
        const descriptionRaw = safeTranslateRaw(t, `items.${index}.description`);
        if (descriptionRaw && typeof descriptionRaw === 'string' && descriptionRaw !== `awards.items.${index}.description`) {
          description = descriptionRaw;
        }
        
        // Vérifier que les valeurs ne sont pas des clés manquantes
        if (!title || title === `awards.items.${index}.title` || title === `items.${index}.title` || title.startsWith('items.')) {
          break;
        }
        if (!organization || organization === `awards.items.${index}.organization` || organization === `items.${index}.organization` || organization.startsWith('items.')) {
          break;
        }
        if (!date || date === `awards.items.${index}.date` || date === `items.${index}.date` || date.startsWith('items.')) {
          break;
        }
        
        awards.push({
          title,
          organization,
          date,
          description,
        });
      } catch (error: any) {
        // Si l'erreur contient MISSING_MESSAGE, on a atteint la fin
        if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
          break;
        }
        // Sinon, continuer avec l'index suivant
        continue;
      }
    }
    return awards;
  };

  const awards = getAwards();

  if (awards.length === 0) {
    return null;
  }

  return (
    <section id="awards" className="py-20 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {awards.map((award, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-start mb-2">
                <span className="text-2xl mr-3">🏆</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {award.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {award.organization}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                {award.date}
              </p>
              {award.description && (
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {award.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

