import type { Camper } from '../../lib/type/camper';
import { Box, Typography, Button, IconButton } from '@mui/material';
import sprite from '../../assets/sprite.svg';

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
    const features: { key: string; label: string; icon: string; stroke?: boolean }[] = [];

    if (camper.transmission) {
        features.push({ key: 'transmission', label: camper.transmission.charAt(0).toUpperCase() + camper.transmission.slice(1), icon: 'icon-diagram' });
    }
    if (camper.AC) features.push({ key: 'AC', label: 'AC', icon: 'icon-wind' });
    if (camper.engine) {
        features.push({ key: 'engine', label: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1), icon: 'icon-fuel' });
    }
    if (camper.kitchen) features.push({ key: 'kitchen', label: 'Kitchen', icon: 'icon-cup-hot' });
    if (camper.TV) features.push({ key: 'TV', label: 'TV', icon: 'icon-tv' });
    if (camper.bathroom) features.push({ key: 'bathroom', label: 'Bathroom', icon: 'icon-ph_shower' });
    if (camper.radio) features.push({ key: 'radio', label: 'Radio', icon: 'icon-radio' });
    if (camper.refrigerator) features.push({ key: 'refrigerator', label: 'Refrigerator', icon: 'icon-solar_fridge-outline' });
    if (camper.microwave) features.push({ key: 'microwave', label: 'Microwave', icon: 'icon-lucide_microwave', stroke: true });
    if (camper.gas) features.push({ key: 'gas', label: 'Gas', icon: 'icon-hugeicons_gas-stove', stroke: true });
    if (camper.water) features.push({ key: 'water', label: 'Water', icon: 'icon-ion_water-outline', stroke: true });

    const handleShowMore = () => {
        window.open(`/catalog/${camper.id}`, '_blank');
    };

    return (
        <Box
            component="article"
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: '24px',
                p: '24px',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '20px'
            }}
        >
            <Box sx={{ width: { xs: '100%', sm: 292 }, height: { xs: 200, sm: 320 }, flexShrink: 0, borderRadius: '10px', overflow: 'hidden' }}>
                <img
                    src={camper.gallery[0]?.thumb}
                    alt={camper.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', mb: '8px', flexWrap: 'wrap' }}>
                    <Typography variant="h2" sx={{ fontSize: '24px', fontWeight: 600, color: 'text.primary', m: 0, lineHeight: 1.25, wordBreak: 'break-word' }}>
                        {camper.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                        <Typography sx={{ fontSize: '24px', fontWeight: 600, color: 'text.primary', whiteSpace: 'nowrap' }}>
                            {formatPrice(camper.price)}
                        </Typography>
                        <IconButton
                            onClick={() => onToggleFavorite(camper.id)}
                            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            sx={{ p: '4px', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.15)' } }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? '#E44848' : 'none'} stroke={isFavorite ? '#E44848' : '#101828'} strokeWidth="1.5">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', mb: '16px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'text.primary', textDecoration: 'underline' }}>
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

                <Typography sx={{ fontSize: '16px', color: 'text.secondary', lineHeight: 1.5, mb: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {camper.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', mb: '24px' }}>
                    {features.slice(0, 6).map((feature) => (
                        <Box
                            key={feature.key}
                            sx={{
                                display: 'flex', alignItems: 'center', gap: '8px', py: '15px', px: '21px',
                                bgcolor: '#F2F4F7', borderRadius: '100px', fontSize: '16px', fontWeight: 500, color: '#101828',
                                textTransform: 'capitalize'
                            }}
                        >
                            <svg
                                width="20"
                                height="20"
                                fill={feature.stroke ? 'none' : 'currentColor'}
                                stroke={feature.stroke ? 'currentColor' : 'none'}
                            >
                                <use href={`${sprite}#${feature.icon}`} />
                            </svg>
                            {feature.label}
                        </Box>
                    ))}
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleShowMore}
                    sx={{ alignSelf: 'flex-start' }}
                >
                    Show more
                </Button>
            </Box>
        </Box>
    );
};

export default CamperCard;
