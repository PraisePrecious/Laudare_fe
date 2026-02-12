

import type { Metadata } from 'next';
import { Lato, Poppins, Inter } from 'next/font/google';
import "./globals.css";
import { AuthProvider } from '@/context/AuthContext';

export const lato = Lato({
  subsets:["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap"
})

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-poppins",
  display: "swap"
})



export const metadata: Metadata = {
  title: 'Laudare AI Academy',
  description: "Innovating the future of intelligence",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "AI skills training",
    "artificial intelligence courses",
    "machine learning education",
    "generative AI training",
    "online tech learning",
    "AI career development",
    "data science and AI",
    "future-ready tech skills",
    "coding"
  ],

  authors: [{ name: "Laudare Academy", url: "https://laudareai.tech" }],
  creator: "Laudare Academy Initiatives",
  publisher: "Laudare Academy",

  openGraph: {
    title: "Laudare Academy | Innovating the future of intelligence",
    description:
      "Innovating the future of intelligence.",
    url: "https://laudareai.tech",
    siteName: "Laudare AI Academy",
    images: [
      {
        url: "/laudare-bg.png",
        width: 1200,
        height: 630,
        alt: "Laudare AI Academy – Innovating the future of intelligence",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Laudare AI Academy",
    description: "Innovating the future of intelligence",
    images: ["/background.png"],
    creator: "@laudare",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

    <head>
      <link rel="icon" href="/favicon.ico" />
    </head>
    
      <body
        className={`${lato.variable} ${lato.variable} antialiased`}
      >
      
          
          <AuthProvider>
            {children}
          </AuthProvider>
      </body>
    </html>
  );
}
