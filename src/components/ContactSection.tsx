'use client';

import { useTranslations } from 'next-intl';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="py-20 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <EnvelopeIcon className="h-12 w-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {t('emailLabel')}
            </h3>
            <a
              href={`mailto:${t('email')}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t('email')}
            </a>
          </div>
          <div className="text-center">
            <PhoneIcon className="h-12 w-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {t('phoneLabel')}
            </h3>
            <a
              href={`tel:${t('phone')}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t('phone')}
            </a>
          </div>
          <div className="text-center">
            <MapPinIcon className="h-12 w-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {t('locationLabel')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t('location')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

