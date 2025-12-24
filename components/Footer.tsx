import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer id="contact" className={styles.footer}>
            <div className="container">
                <h2 className={styles.title}>Let&apos;s Work Together</h2>
                <a href="mailto:hello@olani.com" className={styles.email}>hello@olani.com</a>

                <div className={styles.bottom}>
                    <span>&copy; {new Date().getFullYear()} Olani. All rights reserved.</span>
                    <div className={styles.socials}>
                        <a href="#" className={styles.socialLink}>LinkedIn</a>
                        <a href="#" className={styles.socialLink}>Twitter</a>
                        <a href="#" className={styles.socialLink}>Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
