'use client';

import { useEffect, useState } from 'react';
import { About } from '@/types';
import styles from '../admin.module.css';

export default function AboutPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [form, setForm] = useState({ bio: '', imageUrl: '' });

    useEffect(() => {
        async function fetchAbout() {
            try {
                const res = await fetch('/api/about');
                const data: About = await res.json();
                setForm({ bio: data.bio || '', imageUrl: data.imageUrl || '' });
                if (data.imageUrl) setImagePreview(data.imageUrl);
            } catch (error) {
                console.error('Error fetching about:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchAbout();
    }, []);

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                setForm({ ...form, imageUrl: data.url });
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch('/api/about', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                alert('About section updated!');
            } else {
                alert('Failed to update');
            }
        } catch (error) {
            console.error('Error updating about:', error);
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>About Section</h1>

            <div className={styles.formCard} style={{ background: 'white', maxWidth: '600px' }}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Profile Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxWidth: '150px', marginTop: '0.5rem', borderRadius: '50%' }}
                            />
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Bio</label>
                        <textarea
                            value={form.bio}
                            onChange={e => setForm({ ...form, bio: e.target.value })}
                            placeholder="Write about yourself..."
                            style={{ minHeight: '200px' }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.actionBtn}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
}
