// Client-side component for useState
"use client";
import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
    const [animationStep, setAnimationStep] = useState(0);

    useEffect(() => {
        // Step 0: Badge (2s) -> Step 1: Hey There (2s) -> Step 2: Final
        const timer1 = setTimeout(() => setAnimationStep(1), 2000);
        const timer2 = setTimeout(() => setAnimationStep(2), 4000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <section id="hero" className={`${styles.hero} ${styles[`step-${animationStep}`]}`}>
            <div className={styles.glow} />

            <div className={styles.container}>
                {/* Background Text - Step 1 in Animation (on Mobile) */}
                <div className={`${styles.greetingLeft} ${animationStep >= 1 ? styles.mobileAnimateIn : ''} ${animationStep >= 2 ? styles.mobileAnimateOut : ''}`}>Hey,  </div>
                <div className={`${styles.greetingRight} ${animationStep >= 1 ? styles.mobileAnimateIn : ''} ${animationStep >= 2 ? styles.mobileAnimateOut : ''}`}>there</div>

                {/* Main Image Center - Step 2 (Final) */}
                <div className={`${styles.imageContainer} ${animationStep >= 2 ? styles.mobileAnimateFinal : ''}`}>
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img
                            src="/hero_person_placeholder.png"
                            alt="Olani"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                display: 'block'
                            }}
                            className={styles.personImage}
                        />
                    </div>
                </div>

                {/* Floating Elements */}
                {/* Badge - Step 0 (First) */}
                <div className={`${styles.badge} ${animationStep === 0 ? styles.mobileAnimateIn : styles.mobileAnimateOut}`}>
                    <div className={styles.dot} />
                    Available for new opportunities
                </div>

                {/* Name - Step 2 (Final) */}
                <div className={`${styles.nameWrapper} ${animationStep >= 2 ? styles.mobileAnimateFinal : ''}`}>
                    <div className={styles.iam}>I AM</div>
                    <div className={styles.olani}>OLANI</div>
                </div>

                <div className={`${styles.description} ${animationStep >= 2 ? styles.mobileAnimateFinal : ''}`}>
                    Bridging the gap between<br />
                    complex logic and elegant<br />
                    design with Next.js & Flutter.
                </div>

                <div className={`${styles.roleWrapper} ${animationStep >= 2 ? styles.mobileAnimateFinal : ''}`}>
                    <div className={styles.roleText}>SOFTWARE</div>
                    <div className={styles.roleText}>DEVELOPER</div>
                </div>
            </div>
        </section>
    );
}
