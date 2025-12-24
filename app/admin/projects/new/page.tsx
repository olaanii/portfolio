'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../admin.module.css';

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [form, setForm] = useState({
        title: '',
        description: '',
        imageUrl: '',
        technologies: '',
        githubLink: '',
        liveLink: '',
    });

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show preview
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);

        // Upload to server
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
            alert('Failed to upload image');
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                router.push('/admin/projects');
            } else {
                const error = await res.json();
                alert(error.error || 'Failed to create project');
            }
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Error creating project');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Add New Project</h1>

            <div className={styles.formCard} style={{ background: 'white' }}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Title *</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Description *</label>
                        <textarea
                            value={form.description}
                            onChange={e => setForm({ ...form, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Project Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxWidth: '200px', marginTop: '0.5rem', borderRadius: '8px' }}
                            />
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Technologies (comma-separated) *</label>
                        <input
                            type="text"
                            value={form.technologies}
                            onChange={e => setForm({ ...form, technologies: e.target.value })}
                            placeholder="React, Next.js, TypeScript"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>GitHub Link</label>
                        <input
                            type="url"
                            value={form.githubLink}
                            onChange={e => setForm({ ...form, githubLink: e.target.value })}
                            placeholder="https://github.com/..."
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Live Demo Link</label>
                        <input
                            type="url"
                            value={form.liveLink}
                            onChange={e => setForm({ ...form, liveLink: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.actionBtn}
                        disabled={loading}
                        style={{ opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Saving...' : 'Save Project'}
                    </button>
                </form>
            </div>
        </div>
    );
}
