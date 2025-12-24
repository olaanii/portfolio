'use client';

import { ReactLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import CustomCursor from './CustomCursor';
import Preloader from './Preloader';
import ScrollIndicator from './ScrollIndicator';

export default function Providers({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial load timeout for preloader
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
                <AnimatePresence mode="wait">
                    {loading && <Preloader key="preloader" />}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2 }}
                >
                    <CustomCursor />
                    <ScrollIndicator />
                    {children}
                </motion.div>
            </ReactLenis>
        </ThemeProvider>
    );
}

