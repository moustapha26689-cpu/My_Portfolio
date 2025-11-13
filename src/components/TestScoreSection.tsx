'use client';

import { useTranslations } from 'next-intl';
import { safeTranslateRaw } from '@/lib/translationUtils';

interface TestScore {
  test: string;
  score: string;
  date: string;
  details?: string;
}

export default function TestScoreSection() {
  const t = useTranslations('testScores');

  // Récupérer tous les scores depuis les traductions
  const getScores = (): TestScore[] => {
    const scores: TestScore[] = [];
    const maxItems = 20; // Limite de sécurité
    for (let index = 0; index < maxItems; index++) {
      try {
        // Essayer d'accéder à la clé test - si elle n'existe pas, on arrête
        let test: string;
        try {
          test = t(`items.${index}.test`);
        } catch (error: any) {
          if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
            break;
          }
          throw error;
        }
        
        // Si test existe, récupérer les autres champs obligatoires
        let score: string;
        let date: string;
        try {
          score = t(`items.${index}.score`);
          date = t(`items.${index}.date`);
        } catch (error: any) {
          if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
            break;
          }
          throw error;
        }
        
        let details: string | undefined;
        const detailsRaw = safeTranslateRaw(t, `items.${index}.details`);
        if (detailsRaw && typeof detailsRaw === 'string' && detailsRaw !== `testScores.items.${index}.details`) {
          details = detailsRaw;
        }
        
        // Vérifier que les valeurs ne sont pas des clés manquantes
        if (!test || test === `testScores.items.${index}.test` || test === `items.${index}.test` || test.startsWith('items.')) {
          break;
        }
        if (!score || score === `testScores.items.${index}.score` || score === `items.${index}.score` || score.startsWith('items.')) {
          break;
        }
        if (!date || date === `testScores.items.${index}.date` || date === `items.${index}.date` || date.startsWith('items.')) {
          break;
        }
        
        scores.push({
          test,
          score,
          date,
          details,
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
    return scores;
  };

  const scores = getScores();

  return (
    <section id="testScores" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t('title')}
        </h2>
        <div className="space-y-6">
          {scores.map((score, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {score.test}
                </h3>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {score.score}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                {score.date}
              </p>
              {score.details && (
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {score.details}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

