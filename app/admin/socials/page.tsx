'use client';

import { useEffect, useState } from 'react';
import styles from '../admin.module.css';

interface SocialLink {
    id: string;
    name: string;
    url: string;
    icon?: string;
}

export default function ManageSocials() {
    const [socials, setSocials] = useState<SocialLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', url: '', icon: '' });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchSocials();
    }, []);

    async function fetchSocials() {
        try {
            const res = await fetch('/api/socials');
            const data = await res.json();
            setSocials(data);
        } catch (error) {
            console.error('Error fetching socials:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/socials/${editingId}` : '/api/socials';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({ name: '', url: '', icon: '' });
                setEditingId(null);
                fetchSocials();
            }
        } catch (error) {
            console.error('Error saving social link:', error);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this link?')) return;
        try {
            const res = await fetch(`/api/socials/${id}`, { method: 'DELETE' });
            if (res.ok) fetchSocials();
        } catch (error) {
            console.error('Error deleting social link:', error);
        }
    }

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Manage Social Links</h1>

            <form onSubmit={handleSubmit} className={`${styles.glass} ${styles.form}`} style={{ padding: '2rem', marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Name (e.g. LinkedIn)"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className={styles.input}
                    />
                    <input
                        type="url"
                        placeholder="URL"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        required
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Icon name (optional)"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className={styles.input}
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className={styles.actionBtn}>
                        {editingId ? 'Update' : 'Add'} Link
                    </button>
                    {editingId && (
                        <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', url: '', icon: '' }); }} className={styles.actionBtn} style={{ background: '#666' }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className={styles.tableWrapper}>
                {loading ? <p>Loading...</p> : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>URL</th>
                                <th>Icon</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {socials.length > 0 ? (
                                socials.map((social) => (
                                    <tr key={social.id}>
                                        <td>{social.name}</td>
                                        <td><a href={social.url} target="_blank" rel="noopener noreferrer">{social.url}</a></td>
                                        <td>{social.icon || '-'}</td>
                                        <td>
                                            <button onClick={() => { setEditingId(social.id); setFormData({ name: social.name, url: social.url, icon: social.icon || '' }); }} className={styles.editBtn}>Edit</button>
                                            <button onClick={() => handleDelete(social.id)} className={styles.deleteBtn}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center' }}>No social links found</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
