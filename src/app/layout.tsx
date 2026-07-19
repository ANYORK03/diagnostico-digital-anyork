import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { UtmCapture } from "@/components/utm-capture";
import { MotionProvider } from "@/components/motion-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digitalanyork.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Diagnóstico Gratis para Pequeños Negocios | Digital Anyork LLC",
  description:
    "Descubre qué debes mejorar primero en tu negocio. Recibe gratis un diagnóstico automatizado con tus prioridades y próximos pasos.",
  openGraph: {
    title: "Diagnóstico Gratis para Pequeños Negocios | Digital Anyork LLC",
    description:
      "Descubre qué debes mejorar primero en tu negocio. Recibe gratis un diagnóstico automatizado con tus prioridades y próximos pasos.",
    url: siteUrl,
    siteName: "Digital Anyork LLC",
    locale: "es_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diagnóstico Gratis para Pequeños Negocios | Digital Anyork LLC",
    description:
      "Descubre qué debes mejorar primero en tu negocio. Recibe gratis un diagnóstico automatizado con tus prioridades y próximos pasos.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-da-bg text-da-white antialiased">
        <UtmCapture />
        <MotionProvider>{children}</MotionProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? "G-S23KJRRXRJ"} />
    </html>
  );
}
