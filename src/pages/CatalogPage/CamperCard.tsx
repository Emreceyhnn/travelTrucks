import type { Camper } from '../../lib/type/camper';
import styles from './CamperCard.module.css';

interface CamperCardProps {
    camper: Camper;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
}

const formatPrice = (price: number): string => {
    return `€${price.toFixed(2)}`;
};

const CamperCard: React.FC<CamperCardProps> = ({
    camper,
    isFavorite,
    onToggleFavorite,
}) => {
    const features: { key: string; label: string; icon: string }[] = [];

    if (camper.transmission === 'automatic') {
        features.push({ key: 'transmission', label: 'Automatic', icon: 'transmission' });
    }
    if (camper.AC) features.push({ key: 'AC', label: 'AC', icon: 'ac' });
    if (camper.engine) {
        features.push({ key: 'engine', label: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1), icon: 'engine' });
    }
    if (camper.kitchen) features.push({ key: 'kitchen', label: 'Kitchen', icon: 'kitchen' });
    if (camper.TV) features.push({ key: 'TV', label: 'TV', icon: 'tv' });
    if (camper.bathroom) features.push({ key: 'bathroom', label: 'Bathroom', icon: 'bathroom' });
    if (camper.radio) features.push({ key: 'radio', label: 'Radio', icon: 'radio' });
    if (camper.refrigerator) features.push({ key: 'refrigerator', label: 'Refrigerator', icon: 'refrigerator' });
    if (camper.microwave) features.push({ key: 'microwave', label: 'Microwave', icon: 'microwave' });
    if (camper.gas) features.push({ key: 'gas', label: 'Gas', icon: 'gas' });
    if (camper.water) features.push({ key: 'water', label: 'Water', icon: 'water' });

    const handleShowMore = () => {
        window.open(`/catalog/${camper.id}`, '_blank');
    };

    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={camper.gallery[0]?.thumb}
                    alt={camper.name}
                    className={styles.image}
                    loading="lazy"
                />
            </div>
            <div className={styles.info}>
                <div className={styles.header}>
                    <h2 className={styles.name}>{camper.name}</h2>
                    <div className={styles.priceRow}>
                        <span className={styles.price}>{formatPrice(camper.price)}</span>
                        <button
                            type="button"
                            className={`${styles.heartBtn} ${isFavorite ? styles.heartActive : ''}`}
                            onClick={() => onToggleFavorite(camper.id)}
                            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? '#E44848' : 'none'} stroke={isFavorite ? '#E44848' : '#101828'} strokeWidth="1.5">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={styles.meta}>
                    <span className={styles.rating}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="#FFC531">
                            <path d="M8 0l2.47 4.93L16 5.76l-4 3.82L12.94 16 8 13.27 3.06 16 4 9.58 0 5.76l5.53-.83L8 0z" />
                        </svg>
                        {camper.rating}({camper.reviews.length} Reviews)
                    </span>
                    <span className={styles.location}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#101828" strokeWidth="1.2">
                            <path d="M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 14.6667C10.6667 12 13.3333 9.61217 13.3333 6.66667C13.3333 3.72115 10.9455 1.33333 8 1.33333C5.05448 1.33333 2.66667 3.72115 2.66667 6.66667C2.66667 9.61217 5.33333 12 8 14.6667Z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {camper.location}
                    </span>
                </div>

                <p className={styles.description}>{camper.description}</p>

                <div className={styles.features}>
                    {features.slice(0, 6).map((feature) => (
                        <span key={feature.key} className={styles.featureTag}>
                            {feature.label}
                        </span>
                    ))}
                </div>

                <button type="button" className={styles.showMore} onClick={handleShowMore}>
                    Show more
                </button>
            </div>
        </article>
    );
};

export default CamperCard;
