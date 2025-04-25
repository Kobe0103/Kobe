import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
  title: "Kobe Janssens | Web Developer",
  description: "Personal portfolio of Kobe Janssens, a web developer specializing in modern, functional websites.",
  keywords: ["web developer", "portfolio", "frontend", "UI/UX", "React", "Next.js"],
  authors: [{ name: "Kobe Janssens" }],
  openGraph: {
    title: "Kobe Janssens | Web Developer",
    description: "Personal portfolio of Kobe Janssens, a web developer specializing in modern, functional websites.",
    url: "https://kobejanssens.vercel.app",
    siteName: "Kobe Janssens Portfolio",
    images: [
      {
        url: "/images/preview-image.png",
        width: 1200,
        height: 630,
        alt: "Kobe Janssens Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kobe Janssens | Web Developer",
    description: "Personal portfolio of Kobe Janssens, a web developer specializing in modern, functional websites.",
    images: ["/images/preview-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}