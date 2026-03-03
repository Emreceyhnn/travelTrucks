import { useState, useCallback } from 'react';
import type { CatalogFilters } from '../../lib/type/catalog';
import { Box, Typography, TextField, InputAdornment, Button, Divider } from '@mui/material';
import sprite from "../../assets/sprite.svg";

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
                minHeight: 96,
                height: 'auto',
                py: 1,
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
            <span style={{ textAlign: 'center', lineHeight: 1.2, whiteSpace: 'pre-wrap' }}>
                {label}
            </span>
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
                            <svg width="32" height="32" fill="currentColor">
                                <use href={`${sprite}#icon-wind`} />
                            </svg>
                        }
                        label="AC"
                    />
                    <ToggleButtonCustom
                        active={localFilters.transmission}
                        onClick={() => handleEquipmentToggle('transmission')}
                        icon={
                            <svg width="32" height="32" fill="currentColor">
                                <use href={`${sprite}#icon-diagram`} />
                            </svg>
                        }
                        label="Automatic"
                    />
                    <ToggleButtonCustom
                        active={localFilters.kitchen}
                        onClick={() => handleEquipmentToggle('kitchen')}
                        icon={
                            <svg width="32" height="32" fill="currentColor">
                                <use href={`${sprite}#icon-cup-hot`} />
                            </svg>
                        }
                        label="Kitchen"
                    />
                    <ToggleButtonCustom
                        active={localFilters.TV}
                        onClick={() => handleEquipmentToggle('TV')}
                        icon={
                            <svg width="32" height="32" fill="currentColor">
                                <use href={`${sprite}#icon-tv`} />
                            </svg>
                        }
                        label="TV"
                    />
                    <ToggleButtonCustom
                        active={localFilters.bathroom}
                        onClick={() => handleEquipmentToggle('bathroom')}
                        icon={
                            <svg width="32" height="32" fill="currentColor">
                                <use href={`${sprite}#icon-ph_shower`} />
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
                            <svg width="32" height="32" fill="currentColor">
                                <use href={`${sprite}#icon-bi_grid-1x2`} />
                            </svg>
                        }
                        label="Van"
                    />
                    <ToggleButtonCustom
                        active={localFilters.form === 'fullyIntegrated'}
                        onClick={() => handleFormChange('fullyIntegrated')}
                        icon={
                            <svg width="32" height="32" fill="currentColor">
                                <use href={`${sprite}#icon-bi_grid`} />
                            </svg>
                        }
                        label={"Fully\nIntegrated"}
                    />
                    <ToggleButtonCustom
                        active={localFilters.form === 'alcove'}
                        onClick={() => handleFormChange('alcove')}
                        icon={
                            <svg width="32" height="32" fill="currentColor">
                                <use href={`${sprite}#icon-bi_grid-3x3-gap`} />
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
