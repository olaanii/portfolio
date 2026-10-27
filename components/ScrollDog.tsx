'use client';

import { useEffect, useState } from 'react';
import styles from './ScrollDog.module.css';

export default function ScrollDog() {
  const [progress, setProgress] = useState(0);
  const [walking, setWalking] = useState(false);

  useEffect(() => {
    let frame = 0;
    let stopTimer: ReturnType<typeof setTimeout> | null = null;
    const setScrollProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrollProgress();
        setWalking(true);
        if (stopTimer) clearTimeout(stopTimer);
        stopTimer = setTimeout(() => setWalking(false), 180);
      });
    };

    window.addEventListener('scroll', update, { passive: true });
    setScrollProgress();
    return () => {
      window.removeEventListener('scroll', update);
      cancelAnimationFrame(frame);
      if (stopTimer) clearTimeout(stopTimer);
    };
  }, []);

  return (
    <div className={styles.progress} aria-hidden="true">
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${progress * 100}%` }}>
          <span className={`${styles.dog} ${walking ? styles.walking : ''}`} />
        </div>
      </div>
    </div>
  );
}
