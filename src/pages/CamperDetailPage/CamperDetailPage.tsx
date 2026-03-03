import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchCamperById, clearSelectedCamper } from '../../redux/campersSlice';
import CamperFeatures from './CamperFeatures';
import CamperReviews from './CamperReviews';
import BookingForm from './BookingForm';
import Loader from '../../components/Loader/Loader';
import { Box, Typography, Container, Tabs, Tab, Divider } from '@mui/material';

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

    const handleTabChange = useCallback(
        (_: React.SyntheticEvent, newValue: 'features' | 'reviews') => {
            setActiveTab(newValue);
        },
        []
    );

    if (selectedCamperLoading) {
        return (
            <Box component="section" sx={{ pt: '88px', minHeight: '100vh', bgcolor: 'background.default' }}>
                <Loader />
            </Box>
        );
    }

    if (selectedCamperError) {
        return (
            <Box component="section" sx={{ pt: '88px', minHeight: '100vh', bgcolor: 'background.default' }}>
                <Container maxWidth={false} sx={{ maxWidth: 1700, px: '64px !important', pb: '64px' }}>
                    <Typography color="error" align="center" sx={{ p: 6, fontSize: '16px' }}>
                        {selectedCamperError}
                    </Typography>
                </Container>
            </Box>
        );
    }

    if (!selectedCamper) {
        return null;
    }

    const camper = selectedCamper;

    return (
        <Box component="section" sx={{ pt: '88px', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Container maxWidth={false} sx={{ maxWidth: 1700, px: '64px !important', pb: '64px' }}>
                {/* Header */}
                <Box sx={{ mb: '28px', pt: '24px' }}>
                    <Typography variant="h1" sx={{ fontSize: '24px', fontWeight: 600, color: 'text.primary', mb: '8px' }}>
                        {camper.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', mb: '8px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'text.primary', textDecoration: 'underline', cursor: 'pointer' }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="#FFC531">
                                <path d="M8 0l2.47 4.93L16 5.76l-4 3.82L12.94 16 8 13.27 3.06 16 4 9.58 0 5.76l5.53-.83L8 0z" />
                            </svg>
                            {camper.rating}({camper.reviews.length} Reviews)
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'text.primary' }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#101828" strokeWidth="1.2">
                                <path d="M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 14.6667C10.6667 12 13.3333 9.61217 13.3333 6.66667C13.3333 3.72115 10.9455 1.33333 8 1.33333C5.05448 1.33333 2.66667 3.72115 2.66667 6.66667C2.66667 9.61217 5.33333 12 8 14.6667Z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {camper.location}
                        </Box>
                    </Box>
                    <Typography sx={{ fontSize: '24px', fontWeight: 600, color: 'text.primary', m: 0 }}>
                        €{camper.price.toFixed(2)}
                    </Typography>
                </Box>

                {/* Gallery */}
                <Box sx={{ display: 'flex', gap: '16px', mb: '28px', overflowX: 'auto' }}>
                    {camper.gallery.map((img, index) => (
                        <Box key={index} sx={{ flexShrink: 0, width: 292, height: 312, borderRadius: '10px', overflow: 'hidden' }}>
                            <img
                                src={img.original}
                                alt={`${camper.name} - ${index + 1}`}
                                loading="lazy"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Box>
                    ))}
                </Box>

                {/* Description */}
                <Typography sx={{ fontSize: '16px', color: 'text.secondary', lineHeight: 1.5, mb: '28px' }}>
                    {camper.description}
                </Typography>

                {/* Tabs + Content */}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        sx={{
                            '& .MuiTabs-indicator': {
                                mt: 2,
                                height: 4,
                                borderRadius: '2px',
                                backgroundColor: 'primary.main',
                            },
                        }}
                    >
                        <Tab
                            value="features"
                            label="Features"
                            disableRipple
                            sx={{
                                fontSize: '20px',
                                fontWeight: 600,
                                textTransform: 'none',
                                p: '12px 0',
                                mr: '40px',
                                minWidth: 0,
                                color: 'text.primary',
                                '&.Mui-selected': {
                                    color: 'text.primary',
                                },
                            }}
                        />
                        <Tab
                            value="reviews"
                            label="Reviews"
                            disableRipple
                            sx={{
                                fontSize: '20px',
                                fontWeight: 600,
                                textTransform: 'none',
                                p: '12px 0',
                                minWidth: 0,
                                color: 'text.primary',
                                '&.Mui-selected': {
                                    color: 'text.primary',
                                },
                            }}
                        />
                    </Tabs>
                    <Divider sx={{ mb: '44px' }} />

                    <Box sx={{ display: 'flex', gap: '24px' }}>
                        <Box sx={{
                            flex: '0 0 50%',
                            minWidth: 0,
                            bgcolor: '#F7F7F7',
                            borderRadius: '16px',
                            p: '24px',
                        }}>
                            {activeTab === 'features' ? (
                                <CamperFeatures camper={camper} />
                            ) : (
                                <CamperReviews reviews={camper.reviews} />
                            )}
                        </Box>
                        <Box sx={{ flex: '0 0 calc(50% - 24px)', minWidth: 0 }}>
                            <BookingForm />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default CamperDetailPage;
