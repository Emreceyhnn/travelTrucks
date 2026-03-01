import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchCamperById, clearSelectedCamper } from '../../redux/campersSlice';
import CamperFeatures from './CamperFeatures';
import CamperReviews from './CamperReviews';
import BookingForm from './BookingForm';
import Loader from '../../components/Loader/Loader';
import styles from './CamperDetailPage.module.css';

const CamperDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { selectedCamper, selectedCamperLoading, selectedCamperError } =
        useAppSelector((state) => state.campers);

    const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

    useEffect(() => {
        if (id) {
            dispatch(fetchCamperById(id));
        }
        return () => {
            dispatch(clearSelectedCamper());
        };
    }, [dispatch, id]);

    const handleSetActiveTab = useCallback(
        (tab: 'features' | 'reviews') => {
            setActiveTab(tab);
        },
        []
    );

    if (selectedCamperLoading) {
        return (
            <section className={styles.page}>
                <Loader />
            </section>
        );
    }

    if (selectedCamperError) {
        return (
            <section className={styles.page}>
                <div className={styles.container}>
                    <p className={styles.error}>{selectedCamperError}</p>
                </div>
            </section>
        );
    }

    if (!selectedCamper) {
        return null;
    }

    const camper = selectedCamper;

    return (
        <section className={styles.page}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <h1 className={styles.name}>{camper.name}</h1>
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
                    <p className={styles.price}>€{camper.price.toFixed(2)}</p>
                </div>

                {/* Gallery */}
                <div className={styles.gallery}>
                    {camper.gallery.map((img, index) => (
                        <div key={index} className={styles.galleryItem}>
                            <img
                                src={img.original}
                                alt={`${camper.name} - ${index + 1}`}
                                className={styles.galleryImage}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                {/* Description */}
                <p className={styles.description}>{camper.description}</p>

                {/* Tabs + Content */}
                <div className={styles.tabsSection}>
                    <div className={styles.tabs}>
                        <button
                            type="button"
                            className={`${styles.tab} ${activeTab === 'features' ? styles.tabActive : ''}`}
                            onClick={() => handleSetActiveTab('features')}
                        >
                            Features
                        </button>
                        <button
                            type="button"
                            className={`${styles.tab} ${activeTab === 'reviews' ? styles.tabActive : ''}`}
                            onClick={() => handleSetActiveTab('reviews')}
                        >
                            Reviews
                        </button>
                    </div>
                    <div className={styles.tabDivider} />

                    <div className={styles.contentLayout}>
                        <div className={styles.tabContent}>
                            {activeTab === 'features' ? (
                                <CamperFeatures camper={camper} />
                            ) : (
                                <CamperReviews reviews={camper.reviews} />
                            )}
                        </div>
                        <div className={styles.bookingSidebar}>
                            <BookingForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CamperDetailPage;
