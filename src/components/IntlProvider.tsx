'use client';

import { NextIntlClientProvider } from 'next-intl';
import { IntlErrorCode } from 'next-intl';
import { ReactNode } from 'react';

interface IntlProviderProps {
  locale: string;
  messages: any;
  children: ReactNode;
}

export default function IntlProvider({ locale, messages, children }: IntlProviderProps) {
  return (
    <NextIntlClientProvider 
      locale={locale}
      messages={messages}
      timeZone="Africa/Casablanca"
      onError={(error) => {
        // Suppress MISSING_MESSAGE errors in development
        if (error.code === IntlErrorCode.MISSING_MESSAGE) {
          return; // Don't log or throw
        }
        // Log other errors
        console.error(error);
      }}
      getMessageFallback={({ namespace, key, error }) => {
        // Return the key as fallback for missing messages (prevents errors)
        if (error?.code === IntlErrorCode.MISSING_MESSAGE) {
          return key;
        }
        return key;
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}

