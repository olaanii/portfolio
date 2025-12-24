import styles from './Services.module.css';
import { Reveal } from './Reveal';

interface Service {
    id: string;
    number: string;
    title: string;
    description: string;
}

const services: Service[] = [
    {
        id: '1',
        number: '01',
        title: 'Web Design',
        description: 'The full cycle of services to create and launch a website from scratch or redesign a live website along.'
    },
    {
        id: '2',
        number: '02',
        title: 'Mobile App',
        description: 'The full cycle of services to create and launch a website from scratch or redesign a live website along.'
    },
    {
        id: '3',
        number: '03',
        title: 'System Design',
        description: 'The full cycle of services to create and launch a website from scratch or redesign a live website along.'
    },
    {
        id: '4',
        number: '04',
        title: 'Full Stack',
        description: 'Building end-to-end solutions with a focus on scalability, maintainability, and seamless user experiences.'
    }
];

export default function Services() {
    return (
        <section id="services" className={styles.section}>
            <div className={styles.container}>
                <Reveal width="100%">
                    <h2 className={styles.title}>I CAN HELP YOU WITH</h2>
                </Reveal>
                <div className={styles.grid}>
                    {services.map((service) => (
                        <Reveal key={service.id} width="100%">
                            <div className={styles.card}>
                                <div className={styles.number}>{service.number}</div>
                                <h3 className={styles.cardTitle}>{service.title}</h3>
                                <p className={styles.description}>{service.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
