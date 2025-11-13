'use client';

import { useTranslations } from 'next-intl';
import Masonry from 'react-masonry-css';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption?: string;
}

export default function MediaGallery() {
  const t = useTranslations('gallery');

  // Exemple de données - à remplacer par vos vraies images/vidéos
  // Placez vos fichiers dans public/media/
  const mediaItems: MediaItem[] = [
    {
      type: 'image',
      src: '/next.svg', // Remplacez par vos vraies images
      alt: t('items.0.alt'),
      caption: t('items.0.caption'),
    },
  ];

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t('title')}
        </h2>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {mediaItems.map((item, index) => (
            <div key={index} className="mb-4 break-inside-avoid">
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full rounded-lg shadow-lg"
                />
              ) : (
                <video
                  src={item.src}
                  controls
                  className="w-full rounded-lg shadow-lg"
                >
                  Your browser does not support the video tag.
                </video>
              )}
              {item.caption && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
                  {item.caption}
                </p>
              )}
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
}

