import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchCampers, setFilters, resetCampers } from '../../redux/campersSlice';
import { toggleFavorite } from '../../redux/favoritesSlice';
import type { CatalogFilters } from '../../lib/type/catalog';
import FilterPanel from './FilterPanel';
import CamperCard from './CamperCard';
import Loader from '../../components/Loader/Loader';
import styles from './CatalogPage.module.css';

const CatalogPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, total, page, isLoading, error, filters } = useAppSelector(
        (state) => state.campers
    );
    const favoriteIds = useAppSelector((state) => state.favorites.ids);

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchCampers({ page: 1, filters }));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSearch = useCallback(
        (newFilters: CatalogFilters) => {
            dispatch(setFilters(newFilters));
            dispatch(resetCampers());
            dispatch(fetchCampers({ page: 1, filters: newFilters }));
        },
        [dispatch]
    );

    const handleLoadMore = useCallback(() => {
        dispatch(fetchCampers({ page: page + 1, filters }));
    }, [dispatch, page, filters]);

    const handleToggleFavorite = useCallback(
        (id: string) => {
            dispatch(toggleFavorite(id));
        },
        [dispatch]
    );

    const hasMore = items.length < total;

    return (
        <section className={styles.page}>
            <div className={styles.container}>
                <FilterPanel filters={filters} onSearch={handleSearch} />
                <div className={styles.main}>
                    {error && <p className={styles.error}>{error}</p>}

                    <div className={styles.list}>
                        {items.map((camper) => (
                            <CamperCard
                                key={camper.id}
                                camper={camper}
                                isFavorite={favoriteIds.includes(camper.id)}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        ))}
                    </div>

                    {isLoading && <Loader />}

                    {!isLoading && items.length === 0 && !error && (
                        <p className={styles.empty}>
                            No campers found. Try adjusting your filters.
                        </p>
                    )}

                    {hasMore && !isLoading && (
                        <div className={styles.loadMoreWrapper}>
                            <button
                                type="button"
                                className={styles.loadMore}
                                onClick={handleLoadMore}
                            >
                                Load more
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CatalogPage;
