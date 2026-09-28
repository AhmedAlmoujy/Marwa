import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import { MotionProvider } from '@/context/MotionContext';
import { ThemeProvider } from '@/context/ThemeContext';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://marwa-elbahnsawy.vercel.app'),
  title: 'Marwa El-Bahnsawy — Graphic Designer & Artist | Ideas Take Flight',
  description:
    'Creative editorial portfolio of Marwa El-Bahnsawy, Faculty of Fine Arts graduate (Printed Design Division, 2024). Specializing in printmaking, visual identity, advertising campaigns, and digital art.',
  keywords: [
    'Marwa El-Bahnsawy',
    'Graphic Designer Egypt',
    'Faculty of Fine Arts',
    'Printmaking',
    'Lithography',
    'Intaglio',
    'Visual Identity',
    'Commercial Advertising',
    'Editorial Portfolio'
  ],
  authors: [{ name: 'Marwa El-Bahnsawy' }],
  openGraph: {
    title: 'Marwa El-Bahnsawy — Graphic Designer & Artist',
    description: 'Bespoke editorial portfolio combining fine art printmaking, brand architecture, and tactile digital artistry.',
    type: 'website',
    images: [
      {
        url: '/assets/marwa_portrait.jpg',
        width: 1200,
        height: 630,
        alt: 'Marwa El-Bahnsawy viewing gallery printmaking artwork'
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`} data-theme="dark">
      <body className="bg-(--bg-canvas) text-(--text-primary) antialiased transition-colors duration-300">
        <MotionProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
