'use client';

import { ReactLenis } from 'lenis/react';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ReactLenis root options={{ lerp: 0.12, smoothWheel: true }}>{children}</ReactLenis>
    </ThemeProvider>
  );
}
