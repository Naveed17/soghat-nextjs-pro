import * as React from 'react';
import ThemeRegistry from '@themes/ThemeRegistry';
import { StoreProvider } from '@lib/redux/providers';
import { locales } from '../../../next-intl';
import { Toaster } from 'react-hot-toast';
import { Poppins } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}
export const metadata = {
  title: 'Login-Signup',
  description: '',
};
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} {...(lang === 'ar' && { dir: 'rtl' })}>
      <body className={poppins.className}>
        <StoreProvider>
          <ThemeRegistry lang={lang}>
            <Toaster />
            {children}
          </ThemeRegistry>
        </StoreProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
