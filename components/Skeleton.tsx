import styles from './Skeleton.module.css';

export const ProjectSkeleton = () => {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonContent}>
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonTags}>
                    <div className={styles.skeletonTag} />
                    <div className={styles.skeletonTag} />
                    <div className={styles.skeletonTag} />
                </div>
            </div>
        </div>
    );
};

export const ProjectsGridSkeleton = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '3rem' }}>
            {[1, 2, 3, 4].map((i) => (
                <ProjectSkeleton key={i} />
            ))}
        </div>
    );
};
