'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './admin.module.css';

interface Stats {
    projects: number;
    skills: number;
    experiences: number;
    socials: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ projects: 0, skills: 0, experiences: 0, socials: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const [projectsRes, skillsRes, experienceRes, socialsRes] = await Promise.all([
                    fetch('/api/projects'),
                    fetch('/api/skills'),
                    fetch('/api/experience'),
                    fetch('/api/socials'),
                ]);

                const projects = await projectsRes.json();
                const skills = await skillsRes.json();
                const experiences = await experienceRes.json();
                const socials = await socialsRes.json();

                setStats({
                    projects: Array.isArray(projects) ? projects.length : 0,
                    skills: Array.isArray(skills) ? skills.length : 0,
                    experiences: Array.isArray(experiences) ? experiences.length : 0,
                    socials: Array.isArray(socials) ? socials.length : 0,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Dashboard</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.statsGrid}>
                    <Link href="/admin/projects" className={styles.statCard}>
                        <span className={styles.statNumber}>{stats.projects}</span>
                        <span className={styles.statLabel}>Projects</span>
                    </Link>
                    <Link href="/admin/skills" className={styles.statCard}>
                        <span className={styles.statNumber}>{stats.skills}</span>
                        <span className={styles.statLabel}>Skills</span>
                    </Link>
                    <Link href="/admin/experience" className={styles.statCard}>
                        <span className={styles.statNumber}>{stats.experiences}</span>
                        <span className={styles.statLabel}>Experiences</span>
                    </Link>
                    <Link href="/admin/socials" className={styles.statCard}>
                        <span className={styles.statNumber}>{stats.socials}</span>
                        <span className={styles.statLabel}>Social Links</span>
                    </Link>
                </div>
            )}

            <div style={{ marginTop: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Quick Actions</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link href="/admin/projects/new" className={styles.actionBtn}>
                        + Add Project
                    </Link>
                    <Link href="/admin/skills" className={styles.actionBtn}>
                        + Add Skill
                    </Link>
                    <Link href="/admin/experience" className={styles.actionBtn}>
                        + Add Experience
                    </Link>
                    <Link href="/admin/socials" className={styles.actionBtn}>
                        + Manage Socials
                    </Link>
                </div>
            </div>
        </div>
    );
}
