import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

import { getMessages, setRequestLocale } from 'next-intl/server';
import IntlProvider from '@/components/IntlProvider';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export const metadata: Metadata = {
  title: 'Portfolio • Moustapha Fall',
  description: 'Portfolio personnel',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Définir la locale pour cette requête AVANT de charger les messages
  setRequestLocale(locale);
  
  // Charger les messages pour la locale actuelle
  // getMessages() utilisera automatiquement la locale définie par setRequestLocale()
  const messages = await getMessages({ locale });
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <IntlProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
