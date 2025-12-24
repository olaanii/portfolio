'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`${styles.navbar} glass`}>
            <div className={styles.navContainer}>
                <Link href="/" className={styles.logo}>
                    Olani.
                </Link>

                {/* Desktop Links */}
                <div className={styles.links}>
                    <Link href="/" className={styles.link}>Home</Link>
                    <Link href="#works" className={styles.link}>Works</Link>
                    <Link href="#about" className={styles.link}>About</Link>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ThemeToggle />
                    <Link href="#contact" className={styles.contactBtn}>
                        Contact
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className={styles.mobileMenuBtn}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span
                        className={styles.hamburgerLine}
                        style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}
                    />
                    <span
                        className={styles.hamburgerLine}
                        style={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                    />
                    <span
                        className={styles.hamburgerLine}
                        style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}
                    />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                <Link href="/" className={styles.mobileLink} onClick={toggleMenu}>Home</Link>
                <Link href="#works" className={styles.mobileLink} onClick={toggleMenu}>Works</Link>
                <Link href="#about" className={styles.mobileLink} onClick={toggleMenu}>About</Link>

                <Link
                    href="#contact"
                    className={styles.mobileLink}
                    onClick={toggleMenu}
                    style={{
                        marginTop: '1rem',
                        fontSize: '1.2rem',
                        background: '#000',
                        color: '#fff',
                        padding: '1rem 3rem',
                        borderRadius: '50px',
                        fontFamily: 'var(--font-inter)'
                    }}
                >
                    Contact Me
                </Link>
            </div>
        </nav>
    );
}
