import styles from './Stats.module.css';
import { Reveal } from './Reveal';

export default function Stats() {
    return (
        <section className={styles.section}>
            <div className="container">
                <Reveal width="100%">
                    <h2 className={styles.title}>TURNING MY VISION</h2>
                </Reveal>

                <div className={styles.content}>
                    <div className={styles.statsList}>
                        <div className={styles.statItem}>
                            <Reveal>
                                <span className={styles.statLabel}>Stats</span>
                            </Reveal>
                            <Reveal>
                                <div className={styles.statValue}>
                                    <span className={styles.number}>8+</span>
                                    <span className={styles.text}>Completed projects</span>
                                </div>
                            </Reveal>
                        </div>
                        <div className={styles.statItem}>
                            <Reveal>
                                <span className={styles.statLabel}>Stats</span>
                            </Reveal>
                            <Reveal>
                                <div className={styles.statValue}>
                                    <span className={styles.number}>2+</span>
                                    <span className={styles.text}>Different companies</span>
                                </div>
                            </Reveal>
                        </div>
                        <div className={styles.statItem}>
                            <Reveal>
                                <span className={styles.statLabel}>Stats</span>
                            </Reveal>
                            <Reveal>
                                <div className={styles.statValue}>
                                    <span className={styles.number}>8+</span>
                                    <span className={styles.text}>Years experience</span>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    <Reveal width="100%">
                        <div className={styles.imagePlaceholder} />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
