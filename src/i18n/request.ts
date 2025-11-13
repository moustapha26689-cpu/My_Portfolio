import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from '../../i18n';
import { IntlErrorCode } from 'next-intl';

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is always defined
  const currentLocale = locale || defaultLocale;
  
  return {
    locale: currentLocale,
    messages: (await import(`../../messages/${currentLocale}/common.json`)).default,
    timeZone: 'Africa/Casablanca',
    onError(error) {
      // Suppress MISSING_MESSAGE errors in development
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return; // Don't log or throw
      }
      // Log other errors
      console.error(error);
    },
    getMessageFallback({ namespace, key, error }) {
      // Return the key as fallback for missing messages (prevents errors)
      if (error?.code === IntlErrorCode.MISSING_MESSAGE) {
        return key;
      }
      return key;
    }
  };
});

