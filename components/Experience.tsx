import { Skill } from '@/types';
import styles from './Experience.module.css';
import { Reveal } from './Reveal';

interface ExperienceProps {
    skills?: Skill[];
}

export default function Experience({ skills = [] }: ExperienceProps) {
    return (
        <section id="about" className={styles.section}>
            <div className="container">
                <Reveal width="100%">
                    <h2 className={styles.title}>EXPERIENCE & SKILLS</h2>
                </Reveal>

                <div className={styles.wrapper}>
                    {/* Experience column */}
                    <div className={styles.experienceSide}>
                        <Reveal>
                            <h3 className={styles.sideTitle}>Professional Experience</h3>
                        </Reveal>
                        <div className={styles.list}>
                            <Reveal width="100%">
                                <div className={styles.item}>
                                    <div className={styles.itemHeader}>
                                        <h4 className={styles.role}>Senior Frontend Developer</h4>
                                        <span className={styles.company}>Tech Corp Inc.</span>
                                    </div>
                                    <span className={styles.date}>2021 - Present</span>
                                    <p className={styles.description}>
                                        Leading the frontend team in developing high-performance React applications.
                                    </p>
                                </div>
                            </Reveal>
                            <Reveal width="100%">
                                <div className={styles.item}>
                                    <div className={styles.itemHeader}>
                                        <h4 className={styles.role}>UI/UX Designer</h4>
                                        <span className={styles.company}>Creative Studio</span>
                                    </div>
                                    <span className={styles.date}>2019 - 2021</span>
                                    <p className={styles.description}>
                                        Designed user-centric interfaces for complex web ecosystems.
                                    </p>
                                </div>
                            </Reveal>
                            <Reveal width="100%">
                                <div className={styles.item}>
                                    <div className={styles.itemHeader}>
                                        <h4 className={styles.role}>Web Developer</h4>
                                        <span className={styles.company}>Freelance</span>
                                    </div>
                                    <span className={styles.date}>2017 - 2019</span>
                                    <p className={styles.description}>
                                        Built responsive websites for diverse clients globally.
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* Skills column */}
                    <div className={styles.skillsSide}>
                        <Reveal>
                            <h3 className={styles.sideTitle}>Technical Skills</h3>
                        </Reveal>
                        <div className={styles.skillsGrid}>
                            {skills.length > 0 ? (
                                skills.map((skill) => (
                                    <Reveal key={skill.id} width="100%">
                                        <div className={styles.skillItem}>
                                            <div className={styles.skillHeader}>
                                                <span className={styles.skillName}>{skill.name}</span>
                                                <span className={styles.skillPercent}>{skill.proficiency}%</span>
                                            </div>
                                            <div className={styles.progressBg}>
                                                <div
                                                    className={styles.progressBar}
                                                    style={{ width: `${skill.proficiency}%` }}
                                                />
                                            </div>
                                        </div>
                                    </Reveal>
                                ))
                            ) : (
                                <p style={{ color: '#999' }}>Skills data coming soon...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
