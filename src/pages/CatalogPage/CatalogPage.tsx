import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchCampers, setFilters, resetCampers } from '../../redux/campersSlice';
import { toggleFavorite } from '../../redux/favoritesSlice';
import type { CatalogFilters } from '../../lib/type/catalog';
import FilterPanel from './FilterPanel';
import CamperCard from './CamperCard';
import Loader from '../../components/Loader/Loader';
import { Box, Typography, Button, Container } from '@mui/material';

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
    }, [dispatch, items.length, filters]); // Fix exhaustive-deps

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
        <Box component="section" sx={{ pt: '88px', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Container
                maxWidth={false}
                sx={{
                    maxWidth: 1440,
                    px: { xs: '24px', md: '64px' },
                    pb: '64px',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: '32px', md: '64px' }
                }}
            >
                <FilterPanel filters={filters} onSearch={handleSearch} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    {error && (
                        <Typography color="error" align="center" sx={{ p: 3, fontSize: '16px' }}>
                            {error}
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {items.map((camper) => (
                            <CamperCard
                                key={camper.id}
                                camper={camper}
                                isFavorite={favoriteIds.includes(camper.id)}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        ))}
                    </Box>

                    {isLoading && <Loader />}

                    {!isLoading && items.length === 0 && !error && (
                        <Typography align="center" color="text.secondary" sx={{ p: 6, fontSize: '18px' }}>
                            No campers found. Try adjusting your filters.
                        </Typography>
                    )}

                    {hasMore && !isLoading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '40px' }}>
                            <Button
                                variant="outlined"
                                onClick={handleLoadMore}
                                sx={{
                                    borderColor: 'divider',
                                    color: 'text.primary',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        color: 'primary.main',
                                        backgroundColor: 'transparent'
                                    }
                                }}
                            >
                                Load more
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default CatalogPage;
