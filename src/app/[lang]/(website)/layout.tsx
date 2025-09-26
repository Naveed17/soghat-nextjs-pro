import * as React from 'react';
import "slick-carousel/slick/slick.css";
import '@src/css/slick-theme.css'
import '@src/css/style.css'
import { BottomNavigation, Footer, Header } from '@src/components/base';
import { cookies } from 'next/headers'

export default async function WebsiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}) {
  const { lang } = await params;
  const session = (await cookies()).get('session')?.value;

  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
      <BottomNavigation />
    </>
  );
}
