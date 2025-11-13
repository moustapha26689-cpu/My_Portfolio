import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from './locales';

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is always defined
  const currentLocale = locale || defaultLocale;
  
  return {
    locale: currentLocale,
    messages: (await import(`../../../messages/${currentLocale}/common.json`)).default
  };
});
