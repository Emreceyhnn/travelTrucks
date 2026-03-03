import { useState, useCallback } from 'react';
import type { CatalogFilters } from '../../lib/type/catalog';
import { Box, Typography, TextField, InputAdornment, Button, Divider } from '@mui/material';

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

    const ToggleButtonCustom = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
        <Box
            onClick={onClick}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: 106,
                height: 96,
                border: '1px solid',
                borderColor: active ? 'primary.main' : 'divider',
                borderRadius: '12px',
                bgcolor: active ? '#fff0f0' : 'background.paper',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                color: 'text.primary',
                transition: 'border-color 0.2s, background 0.2s',
                '&:hover': {
                    borderColor: 'primary.main',
                },
            }}
        >
            {icon}
            <span>{label}</span>
        </Box>
    );

    return (
        <Box component="aside" sx={{ width: { xs: '100%', md: 360 }, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Location Section */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '16px', color: 'text.disabled', mb: '8px', fontWeight: 400 }}>
                    Location
                </Typography>
                <TextField
                    placeholder="City"
                    value={localFilters.location}
                    onChange={handleLocationChange}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" sx={{ pl: 1 }}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71404 8.61929 10.8333 10 10.8333Z" stroke="#6C717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 18.3333C13.3333 15 16.6667 12.0152 16.6667 8.33333C16.6667 4.65143 13.6819 1.66667 10 1.66667C6.31811 1.66667 3.33334 4.65143 3.33334 8.33333C3.33334 12.0152 6.66667 15 10 18.3333Z" stroke="#6C717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-input': {
                            pl: 1, // To balance left padding next to icon
                        }
                    }}
                />
            </Box>

            {/* Equipment Section */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '16px', color: 'text.disabled', mb: '8px', fontWeight: 400 }}>
                    Filters
                </Typography>
                <Typography variant="h3" sx={{ fontSize: '20px', fontWeight: 600, color: 'text.primary', mb: '12px' }}>
                    Vehicle equipment
                </Typography>
                <Divider sx={{ mb: '24px' }} />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <ToggleButtonCustom
                        active={localFilters.AC}
                        onClick={() => handleEquipmentToggle('AC')}
                        icon={
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M16 6V26M16 6L20 10M16 6L12 10M16 26L20 22M16 26L12 22M6 16H26M6 16L10 12M6 16L10 20M26 16L22 12M26 16L22 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                        label="AC"
                    />
                    <ToggleButtonCustom
                        active={localFilters.transmission}
                        onClick={() => handleEquipmentToggle('transmission')}
                        icon={
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <circle cx="8" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="16" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="24" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M8 21V10M16 21V8M24 21V10M8 10H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        }
                        label="Automatic"
                    />
                    <ToggleButtonCustom
                        active={localFilters.kitchen}
                        onClick={() => handleEquipmentToggle('kitchen')}
                        icon={
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M12 6V14C12 15.1046 12.8954 16 14 16H18C19.1046 16 20 15.1046 20 14V6M16 16V26M12 26H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                        label="Kitchen"
                    />
                    <ToggleButtonCustom
                        active={localFilters.TV}
                        onClick={() => handleEquipmentToggle('TV')}
                        icon={
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M12 28H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        }
                        label="TV"
                    />
                    <ToggleButtonCustom
                        active={localFilters.bathroom}
                        onClick={() => handleEquipmentToggle('bathroom')}
                        icon={
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M6 16H26M8 16V22C8 24.2091 9.79086 26 12 26H20C22.2091 26 24 24.2091 24 22V16M10 6V16M10 6C10 6 10 4 12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                        label="Bathroom"
                    />
                </Box>
            </Box>

            {/* Vehicle Type Section */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h3" sx={{ fontSize: '20px', fontWeight: 600, color: 'text.primary', mb: '12px' }}>
                    Vehicle type
                </Typography>
                <Divider sx={{ mb: '24px' }} />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <ToggleButtonCustom
                        active={localFilters.form === 'panelTruck'}
                        onClick={() => handleFormChange('panelTruck')}
                        icon={
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect x="4" y="10" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                <rect x="18" y="10" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        }
                        label="Van"
                    />
                    <ToggleButtonCustom
                        active={localFilters.form === 'fullyIntegrated'}
                        onClick={() => handleFormChange('fullyIntegrated')}
                        icon={
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect x="4" y="8" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                <rect x="13" y="8" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                <rect x="22" y="8" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                <rect x="4" y="18" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                <rect x="13" y="18" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                <rect x="22" y="18" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        }
                        label="Fully Integrated"
                    />
                    <ToggleButtonCustom
                        active={localFilters.form === 'alcove'}
                        onClick={() => handleFormChange('alcove')}
                        icon={
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect x="4" y="8" width="24" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                <rect x="4" y="18" width="24" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                <rect x="13" y="8" width="6" height="16" rx="0" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        }
                        label="Alcove"
                    />
                </Box>
            </Box>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                sx={{ alignSelf: 'flex-start' }}
            >
                Search
            </Button>
        </Box>
    );
};

export default FilterPanel;
