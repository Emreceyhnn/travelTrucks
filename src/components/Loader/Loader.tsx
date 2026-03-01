import styles from './Loader.module.css';

const Loader: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.spinner} />
        </div>
    );
};

export default Loader;
