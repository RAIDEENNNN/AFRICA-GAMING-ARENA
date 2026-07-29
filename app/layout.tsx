import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://africagamingarena.example"),
  title: {
    default: "Africa Gaming Arena | Compete. Dominate. Become Legendary.",
    template: "%s | Africa Gaming Arena",
  },
  description:
    "Africa Gaming Arena is a mobile esports platform for CODM, PUBG Mobile and Free Fire players to create challenges, join clans, enter tournaments and build verified rankings.",
  applicationName: "Africa Gaming Arena",
  appleWebApp: {
    capable: true,
    title: "AGA",
    statusBarStyle: "black-translucent",
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffc400",
  openGraph: {
    title: "Africa Gaming Arena",
    description:
      "Compete. Dominate. Become Legendary. AGA brings mobile esports challenges, clans, CMA tournaments and verified rankings into one platform.",
    siteName: "Africa Gaming Arena",
    images: [{ url: "/images/aga/hero/codm-hero-desktop.webp", width: 3840, height: 2160, alt: "Africa Gaming Arena tactical esports hero" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Africa Gaming Arena",
    description: "Compete. Dominate. Become Legendary.",
    images: ["/images/aga/hero/codm-hero-desktop.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#ffc400" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
