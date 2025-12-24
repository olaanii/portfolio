'use client';

import { useEffect, useState } from 'react';
import { Experience } from '@/types';
import styles from '../admin.module.css';

export default function ExperiencePage() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ role: '', company: '', startDate: '', endDate: '', description: '' });
    const [editing, setEditing] = useState<string | null>(null);

    useEffect(() => {
        fetchExperiences();
    }, []);

    async function fetchExperiences() {
        try {
            const res = await fetch('/api/experience');
            const data = await res.json();
            setExperiences(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching experiences:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const url = editing ? `/api/experience/${editing}` : '/api/experience';
        const method = editing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setForm({ role: '', company: '', startDate: '', endDate: '', description: '' });
                setEditing(null);
                fetchExperiences();
            }
        } catch (error) {
            console.error('Error saving experience:', error);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this experience?')) return;

        try {
            await fetch(`/api/experience/${id}`, { method: 'DELETE' });
            fetchExperiences();
        } catch (error) {
            console.error('Error deleting experience:', error);
        }
    }

    function handleEdit(exp: Experience) {
        setForm({
            role: exp.role,
            company: exp.company,
            startDate: exp.startDate,
            endDate: exp.endDate || '',
            description: exp.description || '',
        });
        setEditing(exp.id);
    }

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Experience</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Form */}
                <div className={styles.formCard} style={{ background: 'white' }}>
                    <h2 style={{ marginBottom: '1rem' }}>{editing ? 'Edit' : 'Add'} Experience</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>Role</label>
                            <input
                                type="text"
                                value={form.role}
                                onChange={e => setForm({ ...form, role: e.target.value })}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Company</label>
                            <input
                                type="text"
                                value={form.company}
                                onChange={e => setForm({ ...form, company: e.target.value })}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Start Date</label>
                            <input
                                type="text"
                                value={form.startDate}
                                onChange={e => setForm({ ...form, startDate: e.target.value })}
                                placeholder="2020"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>End Date (leave empty for Present)</label>
                            <input
                                type="text"
                                value={form.endDate}
                                onChange={e => setForm({ ...form, endDate: e.target.value })}
                                placeholder="Present"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Description</label>
                            <textarea
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                            />
                        </div>
                        <button type="submit" className={styles.actionBtn}>
                            {editing ? 'Update' : 'Add'} Experience
                        </button>
                        {editing && (
                            <button
                                type="button"
                                onClick={() => { setEditing(null); setForm({ role: '', company: '', startDate: '', endDate: '', description: '' }); }}
                                style={{ marginTop: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </div>

                {/* List */}
                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : experiences.length === 0 ? (
                        <p>No experiences yet.</p>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Role</th>
                                    <th>Company</th>
                                    <th>Period</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {experiences.map(exp => (
                                    <tr key={exp.id}>
                                        <td>{exp.role}</td>
                                        <td>{exp.company}</td>
                                        <td>{exp.startDate} - {exp.endDate || 'Present'}</td>
                                        <td className={styles.tableActions}>
                                            <button onClick={() => handleEdit(exp)} className={styles.editBtn}>
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(exp.id)} className={styles.deleteBtn}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
