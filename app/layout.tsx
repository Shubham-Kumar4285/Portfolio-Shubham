import type { Metadata, Viewport } from 'next';
import { Space_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { ScrollFx } from '@/components/fx/ScrollFx';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { getPersonal, getSite } from '@/lib/content';
import './globals.css';

// Japanese-capable fonts are glyph subsets (see scripts/subset-fonts.mjs, `npm run fonts`).
const dela = localFont({
  src: './fonts/dela-gothic-one-400.woff2',
  weight: '400',
  variable: '--font-dela',
  display: 'swap',
});
const zen = localFont({
  src: [
    { path: './fonts/zen-kaku-gothic-new-400.woff2', weight: '400' },
    { path: './fonts/zen-kaku-gothic-new-700.woff2', weight: '700' },
  ],
  variable: '--font-zen',
  display: 'swap',
});
const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-space-mono', display: 'swap' });

const personal = getPersonal();
const site = getSite();
const title = `${personal.name} | ${personal.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${personal.name}` },
  description: personal.description,
  keywords: ['Full Stack Developer', 'Web Developer', 'React', 'Kotlin', 'Java', 'Portfolio', personal.name],
  authors: [{ name: personal.name }],
  creator: personal.name,
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title,
    description: personal.description,
    siteName: `${personal.name} Portfolio`,
    images: [{ url: '/preview.jpg', width: 1200, height: 630, alt: `${personal.name} portfolio preview` }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: personal.description,
    images: ['/preview.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0607',
  colorScheme: 'dark light',
};

/**
 * Runs before first paint: Night is the default (server-rendered class),
 * so only a saved "day" choice needs undoing. Keep the key in sync with ModeToggle.
 */
const MODE_SCRIPT = `try{if(localStorage.getItem('mode')==='day')document.documentElement.classList.remove('night')}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`night ${dela.variable} ${zen.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MODE_SCRIPT }} />
      </head>
      <body>
        <a
          href="#content"
          className="sr-only z-50 bg-ink px-4 py-3 font-mono text-fg-inv focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="overflow-clip bg-page text-fg">
          {children}
        </main>
        <ScrollFx />
      </body>
    </html>
  );
}
