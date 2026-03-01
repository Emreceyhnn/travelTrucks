import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <NavLink to="/" className={styles.logo}>
                    <span className={styles.logoIcon}>
                        <svg width="136" height="16" viewBox="0 0 136 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <text x="0" y="14" fontFamily="Inter" fontWeight="600" fontSize="16" fill="currentColor">TravelTrucks</text>
                        </svg>
                    </span>
                </NavLink>
                <nav className={styles.nav}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.active : ''}`
                        }
                        end
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/catalog"
                        className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.active : ''}`
                        }
                    >
                        Catalog
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
