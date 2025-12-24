'use client';

import { useState, useEffect } from 'react';
import styles from './ScrollIndicator.module.css';

const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'works', label: 'Works' },
    { id: 'about', label: 'About' }
];

export default function ScrollIndicator() {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            // Find the current section in view
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                    }
                }
            }

            // Handle bottom of page
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
                setActiveSection('about'); // Last section usually
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.indicatorContainer}>
            {sections.map((section) => (
                <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => handleClick(e, section.id)}
                    className={`${styles.dot} ${activeSection === section.id ? styles.active : ''}`}
                    aria-label={`Scroll to ${section.label}`}
                >
                    <span className={styles.label}>{section.label}</span>
                </a>
            ))}
        </div>
    );
}
