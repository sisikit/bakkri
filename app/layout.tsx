import type { Metadata } from "next";
import { Cairo, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";

const cairo = Cairo({
  display: "swap",
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

const ibmPlexMono = IBM_Plex_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Birthday CTF | Off-Grid Dev Runtime",
  description:
    "A cinematic single-page birthday gift and puzzle journey built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cairo.variable} ${ibmPlexMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
