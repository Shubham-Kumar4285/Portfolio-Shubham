import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shubham Kumar | Full Stack Developer",
  description: "Full Stack Developer crafting seamless digital experiences from stunning frontends to powerful backends. Specializing in React, Next.js, Spring Boot, and modern web technologies.",
  keywords: ["Full Stack Developer", "Web Developer", "React", "Next.js", "Spring Boot", "Portfolio", "Shubham Kumar"],
  authors: [{ name: "Shubham Kumar" }],
  creator: "Shubham Kumar",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png" }
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-shubham-seven.vercel.app/",
    title: "Shubham Kumar | Full Stack Developer",
    description: "Full Stack Developer crafting seamless digital experiences from stunning frontends to powerful backends.",
    siteName: "Shubham Kumar Portfolio",
    images: [
      {
        url: "/preview.PNG",
        width: 1200,
        height: 630,
        alt: "Shubham Kumar Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham Kumar | Full Stack Developer",
    description: "Full Stack Developer crafting seamless digital experiences from stunning frontends to powerful backends.",
    images: ["/preview.PNG"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-500`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
