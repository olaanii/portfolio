'use client';

import { useEffect, useState } from 'react';
import { Skill } from '@/types';
import styles from '../admin.module.css';

export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ name: '', category: 'Frontend', proficiency: 50 });
    const [editing, setEditing] = useState<string | null>(null);

    useEffect(() => {
        fetchSkills();
    }, []);

    async function fetchSkills() {
        try {
            const res = await fetch('/api/skills');
            const data = await res.json();
            setSkills(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching skills:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const url = editing ? `/api/skills/${editing}` : '/api/skills';
        const method = editing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setForm({ name: '', category: 'Frontend', proficiency: 50 });
                setEditing(null);
                fetchSkills();
            }
        } catch (error) {
            console.error('Error saving skill:', error);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this skill?')) return;

        try {
            await fetch(`/api/skills/${id}`, { method: 'DELETE' });
            fetchSkills();
        } catch (error) {
            console.error('Error deleting skill:', error);
        }
    }

    function handleEdit(skill: Skill) {
        setForm({ name: skill.name, category: skill.category, proficiency: skill.proficiency });
        setEditing(skill.id);
    }

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Skills</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Form */}
                <div className={styles.formCard} style={{ background: 'white' }}>
                    <h2 style={{ marginBottom: '1rem' }}>{editing ? 'Edit Skill' : 'Add Skill'}</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>Skill Name</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Category</label>
                            <select
                                value={form.category}
                                onChange={e => setForm({ ...form, category: e.target.value })}
                            >
                                <option>Frontend</option>
                                <option>Backend</option>
                                <option>Mobile</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Proficiency ({form.proficiency}%)</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={form.proficiency}
                                onChange={e => setForm({ ...form, proficiency: parseInt(e.target.value) })}
                            />
                        </div>
                        <button type="submit" className={styles.actionBtn}>
                            {editing ? 'Update' : 'Add'} Skill
                        </button>
                        {editing && (
                            <button
                                type="button"
                                onClick={() => { setEditing(null); setForm({ name: '', category: 'Frontend', proficiency: 50 }); }}
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
                    ) : skills.length === 0 ? (
                        <p>No skills yet.</p>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Level</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {skills.map(skill => (
                                    <tr key={skill.id}>
                                        <td>{skill.name}</td>
                                        <td>{skill.category}</td>
                                        <td>{skill.proficiency}%</td>
                                        <td className={styles.tableActions}>
                                            <button onClick={() => handleEdit(skill)} className={styles.editBtn}>
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(skill.id)} className={styles.deleteBtn}>
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
