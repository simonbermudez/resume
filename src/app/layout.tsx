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
  title: "Simon Bermudez | 3D resume",
  description: "3D resume of Simon Bermudez",
  keywords: ["3D", "resume", "Simon Bermudez"],
  authors: [{ name: "Simon Bermudez" }],
  openGraph: {
    title: "Simon Bermudez | 3D resume",
    description: "3D resume of Simon Bermudez",
    url: "https://simonbermudez.com",
    images: [
      {
        url: "/preview.png",
        alt: "Simon Bermudez 3D Resume Preview",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  themeColor: "black",
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
        <Analytics />
      </body>
    </html>
  );
}
