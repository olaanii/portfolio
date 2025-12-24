'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import styles from './Navbar.module.css';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={styles.themeToggle}
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun size={20} className={styles.sunIcon} />
            ) : (
                <Moon size={20} className={styles.moonIcon} />
            )}
        </button>
    );
}
