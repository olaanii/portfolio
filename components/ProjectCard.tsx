import { Project } from '@/types';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    // Handle technologies as comma-separated string or array
    const technologies = typeof project.technologies === 'string'
        ? project.technologies.split(',').map(t => t.trim()).filter(Boolean)
        : project.technologies || [];

    return (
        <div className={`${styles.card} glass`}>
            <div className={styles.imageContainer}>
                {project.imageUrl && <img src={project.imageUrl} alt={project.title} className={styles.image} />}
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags}>
                    {technologies.map((tech) => (
                        <span key={tech} className={styles.tag}>{tech}</span>
                    ))}
                </div>
                <div className={styles.footer}>
                    <div className={styles.links}>
                        {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                                GitHub
                            </a>
                        )}
                        {project.liveLink && (
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                                Live Demo
                            </a>
                        )}
                    </div>
                    <button className={styles.caseStudyBtn}>View Case Study</button>
                </div>
            </div>
        </div>
    );
}
