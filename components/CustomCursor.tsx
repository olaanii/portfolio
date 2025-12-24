'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleHover);
        };
    }, []);

    const springConfig = { damping: 25, stiffness: 150 };
    const cursorX = useSpring(mousePosition.x - 16, springConfig);
    const cursorY = useSpring(mousePosition.y - 16, springConfig);

    return (
        <motion.div
            className={styles.cursor}
            style={{
                x: cursorX,
                y: cursorY,
                scale: isHovering ? 2.5 : 1,
                backgroundColor: isHovering ? 'rgba(255, 225, 160, 0.3)' : 'rgba(0, 0, 0, 0.1)',
                border: isHovering ? '1px solid rgba(255, 225, 160, 0.5)' : '1px solid rgba(0, 0, 0, 0.2)',
            }}
        />
    );
}
