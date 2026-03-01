import { useState, useCallback } from 'react';
import type { CatalogFilters } from '../../lib/type/catalog';
import styles from './FilterPanel.module.css';

interface FilterPanelProps {
    filters: CatalogFilters;
    onSearch: (filters: CatalogFilters) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters: initialFilters, onSearch }) => {
    const [localFilters, setLocalFilters] = useState<CatalogFilters>(initialFilters);

    const handleLocationChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setLocalFilters((prev) => ({ ...prev, location: e.target.value }));
        },
        []
    );

    const handleEquipmentToggle = useCallback(
        (key: keyof Pick<CatalogFilters, 'AC' | 'transmission' | 'kitchen' | 'TV' | 'bathroom'>) => {
            setLocalFilters((prev) => ({ ...prev, [key]: !prev[key] }));
        },
        []
    );

    const handleFormChange = useCallback((form: string) => {
        setLocalFilters((prev) => ({
            ...prev,
            form: prev.form === form ? '' : form,
        }));
    }, []);

    const handleSearch = useCallback(() => {
        onSearch(localFilters);
    }, [localFilters, onSearch]);

    return (
        <aside className={styles.sidebar}>
            <div className={styles.section}>
                <label className={styles.locationLabel}>Location</label>
                <div className={styles.locationInput}>
                    <svg className={styles.mapIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71404 8.61929 10.8333 10 10.8333Z" stroke="#6C717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 18.3333C13.3333 15 16.6667 12.0152 16.6667 8.33333C16.6667 4.65143 13.6819 1.66667 10 1.66667C6.31811 1.66667 3.33334 4.65143 3.33334 8.33333C3.33334 12.0152 6.66667 15 10 18.3333Z" stroke="#6C717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                        type="text"
                        placeholder="City"
                        value={localFilters.location}
                        onChange={handleLocationChange}
                        className={styles.input}
                    />
                </div>
            </div>

            <div className={styles.section}>
                <p className={styles.sectionLabel}>Filters</p>
                <h3 className={styles.sectionTitle}>Vehicle equipment</h3>
                <div className={styles.divider} />
                <div className={styles.toggleGrid}>
                    <button
                        type="button"
                        className={`${styles.toggleBtn} ${localFilters.AC ? styles.active : ''}`}
                        onClick={() => handleEquipmentToggle('AC')}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M16 6V26M16 6L20 10M16 6L12 10M16 26L20 22M16 26L12 22M6 16H26M6 16L10 12M6 16L10 20M26 16L22 12M26 16L22 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>AC</span>
                    </button>
                    <button
                        type="button"
                        className={`${styles.toggleBtn} ${localFilters.transmission ? styles.active : ''}`}
                        onClick={() => handleEquipmentToggle('transmission')}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <circle cx="8" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="16" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="24" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M8 21V10M16 21V8M24 21V10M8 10H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span>Automatic</span>
                    </button>
                    <button
                        type="button"
                        className={`${styles.toggleBtn} ${localFilters.kitchen ? styles.active : ''}`}
                        onClick={() => handleEquipmentToggle('kitchen')}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M12 6V14C12 15.1046 12.8954 16 14 16H18C19.1046 16 20 15.1046 20 14V6M16 16V26M12 26H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Kitchen</span>
                    </button>
                    <button
                        type="button"
                        className={`${styles.toggleBtn} ${localFilters.TV ? styles.active : ''}`}
                        onClick={() => handleEquipmentToggle('TV')}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M12 28H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span>TV</span>
                    </button>
                    <button
                        type="button"
                        className={`${styles.toggleBtn} ${localFilters.bathroom ? styles.active : ''}`}
                        onClick={() => handleEquipmentToggle('bathroom')}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M6 16H26M8 16V22C8 24.2091 9.79086 26 12 26H20C22.2091 26 24 24.2091 24 22V16M10 6V16M10 6C10 6 10 4 12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Bathroom</span>
                    </button>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Vehicle type</h3>
                <div className={styles.divider} />
                <div className={styles.toggleGrid}>
                    <button
                        type="button"
                        className={`${styles.toggleBtn} ${localFilters.form === 'panelTruck' ? styles.active : ''}`}
                        onClick={() => handleFormChange('panelTruck')}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect x="4" y="10" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="18" y="10" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <span>Van</span>
                    </button>
                    <button
                        type="button"
                        className={`${styles.toggleBtn} ${localFilters.form === 'fullyIntegrated' ? styles.active : ''}`}
                        onClick={() => handleFormChange('fullyIntegrated')}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect x="4" y="8" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="13" y="8" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="22" y="8" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="4" y="18" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="13" y="18" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="22" y="18" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <span>Fully Integrated</span>
                    </button>
                    <button
                        type="button"
                        className={`${styles.toggleBtn} ${localFilters.form === 'alcove' ? styles.active : ''}`}
                        onClick={() => handleFormChange('alcove')}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect x="4" y="8" width="24" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="4" y="18" width="24" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="13" y="8" width="6" height="16" rx="0" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <span>Alcove</span>
                    </button>
                </div>
            </div>

            <button type="button" className={styles.searchBtn} onClick={handleSearch}>
                Search
            </button>
        </aside>
    );
};

export default FilterPanel;
