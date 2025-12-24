'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import styles from '../admin.module.css';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            setProjects(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProjects(projects.filter(p => p.id !== id));
            } else {
                alert('Failed to delete project');
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Error deleting project');
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Projects</h1>
                <Link href="/admin/projects/new" className={styles.actionBtn}>
                    + Add Project
                </Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : projects.length === 0 ? (
                <p style={{ color: '#666' }}>No projects yet. Add your first project!</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Technologies</th>
                            <th>GitHub</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project.id}>
                                <td>{project.title}</td>
                                <td>{project.technologies}</td>
                                <td>
                                    {project.githubLink ? (
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                            View
                                        </a>
                                    ) : '-'}
                                </td>
                                <td className={styles.tableActions}>
                                    <Link href={`/admin/projects/${project.id}/edit`} className={styles.editBtn}>
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className={styles.deleteBtn}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
