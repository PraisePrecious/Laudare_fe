

import type { Metadata } from 'next';
import { Lato, Poppins, Inter } from 'next/font/google';
import "../globals.css";
import Header from '@/components/ui/Header';
import Footer from '@/components/sections/Footer';

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
  title: 'Laudare Academy',
  description: "",
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
    "future-ready tech skills"
  ],

  authors: [{ name: "Laudare Academy", url: "https://laudare.vercel.app" }],
  creator: "Laudare Academy Initiatives",
  publisher: "Laudare Academy",

  openGraph: {
    title: "Laudare Academy |  Innovating the future of intelligence",
    description:
      "Innovating the future of intelligence.",
    url: "https://laudare-fe.vercel.app",
    siteName: "Laudare Academy",
    images: [
      {
        url: "/laudare-bg.png",
        width: 1200,
        height: 630,
        alt: "Laudare Academy – Innovating the future of intelligence",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Laudare Academy",
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
      
          
            <Header />
            {children}
            <Footer />
      </body>
    </html>
  );
}
