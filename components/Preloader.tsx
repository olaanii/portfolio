'use client';

import { motion } from 'framer-motion';
import styles from './Preloader.module.css';

export default function Preloader() {
    return (
        <motion.div
            className={styles.preloader}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            <div className={styles.container}>
                <motion.div
                    className={styles.logo}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Olani.
                </motion.div>
                <div className={styles.progressContainer}>
                    <motion.div
                        className={styles.progressBar}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.8, ease: "easeInOut" }}
                    />
                </div>
                <motion.div
                    className={styles.status}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Initializing Experience...
                </motion.div>
            </div>
        </motion.div>
    );
}
