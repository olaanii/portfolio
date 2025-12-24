import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dancing = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Olani | Software Developer & Designer",
  description: "Crafting digital experiences that bridge the gap between complex logic and elegant design.",
  openGraph: {
    title: "Olani | Portfolio",
    description: "Full Stack Developer specializing in React, Next.js, and Flutter.",
    url: "https://your-domain.com",
    siteName: "Olani Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${dancing.variable} ${cormorant.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
