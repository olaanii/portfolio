import type { Metadata } from "next";
import { JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Olani Shambel — Flutter Developer",
  description: "Olani Shambel is a Flutter developer building cross-platform apps and exploring Web3 and AI.",
  openGraph: {
    title: "Olani Shambel — Portfolio",
    description: "Flutter developer · Web3 and AI. Selected work, stack, and open-source projects.",
    siteName: "Olani Shambel",
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
      <body className={`${serif.variable} ${mono.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
