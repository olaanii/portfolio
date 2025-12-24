'use client';

import { useState, useEffect } from 'react';
import styles from './Contact.module.css';
import { Reveal } from './Reveal';
import Magnetic from './Magnetic';

interface SocialLink {

    id: string;
    name: string;
    url: string;
    icon?: string;
}

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const [socials, setSocials] = useState<SocialLink[]>([]);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        async function fetchSocials() {
            try {
                const res = await fetch('/api/socials');
                if (res.ok) {
                    const data = await res.json();
                    setSocials(data);
                }
            } catch (error) {
                console.error('Error fetching socials:', error);
            }
        }
        fetchSocials();
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="contact" className={styles.section}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <Reveal width="100%">
                            <h2 className={styles.title}>Let's Work Together</h2>
                        </Reveal>
                        <Reveal width="100%">
                            <p className={styles.subtitle}>
                                Have a project in mind? Looking for a developer to join your team?
                                I'm always open to new opportunities.
                            </p>
                        </Reveal>

                        <div className={styles.info}>
                            <Reveal>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Email</span>
                                    <a href="mailto:contact@olani.com" className={styles.value}>contact@olani.com</a>
                                </div>
                            </Reveal>
                            <Reveal>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Socials</span>
                                    <div className={styles.socials}>
                                        {socials.length > 0 ? socials.map((social) => (
                                            <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                                {social.name}
                                            </a>
                                        )) : (
                                            <>
                                                <a href="#" className={styles.socialLink}>LinkedIn</a>
                                                <a href="#" className={styles.socialLink}>GitHub</a>
                                                <a href="#" className={styles.socialLink}>Twitter</a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    <Reveal width="100%">
                        <form onSubmit={handleSubmit} className={`${styles.form} glass`}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.label}>Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className={styles.input}
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.label}>Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className={styles.input}
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="subject" className={styles.label}>Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    className={styles.input}
                                    placeholder="Project Collaboration"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.label}>Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    className={styles.textarea}
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <Magnetic>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={styles.submitBtn}
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </Magnetic>

                            {status === 'success' && (
                                <p className={styles.successMessage}>
                                    Thanks for reaching out! I'll get back to you soon.
                                </p>
                            )}
                            {status === 'error' && (
                                <p className={styles.errorMessage}>
                                    Something went wrong. Please try again later.
                                </p>
                            )}
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
