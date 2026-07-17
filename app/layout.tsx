import type { Metadata, Viewport } from "next";
import { Inter, Zilla_Slab } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileContactBar from "@/components/common/MobileContactBar";
import FloatingActions from "@/components/common/FloatingActions";
import QuoteModal from "@/components/common/QuoteModal";
import { LocalBusinessSchema } from "@/components/common/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Zilla Slab — a sturdy traditional slab serif that echoes the logo's
// "HERRERA" wordmark. Used for all display headings.
const zillaSlab = Zilla_Slab({
  variable: "--font-zilla",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.owner }],
  keywords: [
    "landscaping services Sunnyvale",
    "Sunnyvale landscaping company",
    "hardscaping contractor Sunnyvale",
    "paver installation Sunnyvale",
    "artificial grass installation Sunnyvale",
    "fence installation Sunnyvale",
    "irrigation services Sunnyvale",
    "landscape maintenance Sunnyvale",
    "Bay Area landscaping services",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: "/assets/images/backgrounds/og-home.webp", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/assets/images/backgrounds/og-home.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Landscaping",
};

export const viewport: Viewport = {
  themeColor: "#245635",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${zillaSlab.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-beige-50 text-charcoal">
        <LocalBusinessSchema />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:left-4 focus:top-4 focus:rounded-md focus:bg-forest-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileContactBar />
        <FloatingActions />
        <QuoteModal />
      </body>
    </html>
  );
}
