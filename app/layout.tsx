import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import PageLoader from "@/components/PageLoader";

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhavesh Jethani | SEO Expert & Digital Marketer",
  description:
    "I help businesses grow through data-driven SEO strategies, technical optimization, content marketing and local SEO that increase visibility, organic traffic and conversions.",
  openGraph: {
    title: "Bhavesh Jethani | SEO Expert & Digital Marketer",
    description:
      "Helping local businesses build a stronger digital presence through SEO, Google Business Profile optimization and creative design.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhavesh Jethani | SEO Expert & Digital Marketer",
    description:
      "Helping local businesses build a stronger digital presence through SEO, Google Business Profile optimization and creative design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <PageLoader />
        <ScrollProgress />
        <SmoothScroll />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
