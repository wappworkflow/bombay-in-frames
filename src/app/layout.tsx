import type { Metadata } from "next";
import { Fraunces, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import AIChatBot from "@/components/AIChatBot";
import IntroPopup from "@/components/IntroPopup";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import PagePreloader from "@/components/PagePreloader";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Bombay In Frames — Production House & Marketing Studio",
  description:
    "We don't shoot. We tell. We build legacies. Film production, brand marketing, social media, performance advertising and web development from Bombay In Frames, Mumbai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable} antialiased bg-parchment text-ink`}
      >
        <PagePreloader />
        <div className="film-grain" aria-hidden="true" />
        <IntroPopup />
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <Footer />
        <AIChatBot />
        <ScrollToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}
