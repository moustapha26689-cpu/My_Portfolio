export const locales = ['fr', 'en'] as const;
export const defaultLocale = 'fr';
export const localePrefix = 'always' as const;

export type Locale = (typeof locales)[number];
