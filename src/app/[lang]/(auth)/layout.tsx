import * as React from 'react';
import { locales } from '../../../../next-intl';
import { Footer, Header } from '@components/base';
import { cookies } from 'next/headers';
export async function generateStaticParams() {
    return locales.map((locale) => ({ lang: locale }));
}
export const metadata = {
    title: 'Login-Signup',
    description: '',
};


export default async function AuthLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{
        lang: string;
    }>;
}) {
    const session = (await cookies()).get('session')?.value;

    return (
        <>

            <Header showSearch={false} session={session} />
            {children}
            <Footer />
        </>
    );
}
