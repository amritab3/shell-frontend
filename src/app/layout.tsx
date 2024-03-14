import ThemeRegistry from '@/theme/ThemeRegistry';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Grid from '@mui/material/Grid';

import { ReduxProvider } from '@/redux/provider';
import Toast from '@/components/Toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'ThreadSwap',
    description: 'An eCommerce platform',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReduxProvider>
                    <ThemeRegistry>
                        <Grid
                            container
                            sx={{
                                height: '100vh',
                                flexGrow: 1,
                            }}
                        >
                            <Grid item xs={12} alignSelf="flex-start">
                                <Header />
                            </Grid>
                            <Grid item xs={12}>
                                {children}
                            </Grid>
                            <Grid item xs={12} alignSelf="flex-end">
                                <Footer />
                            </Grid>
                        </Grid>
                        <Toast />
                    </ThemeRegistry>
                </ReduxProvider>
            </body>
        </html>
    );
}
