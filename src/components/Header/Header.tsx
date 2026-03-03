import { NavLink } from 'react-router-dom';
import { AppBar, Box } from '@mui/material';

const Header: React.FC = () => {
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                bgcolor: '#F7F7F7',
                borderBottom: '1px solid #F2F4F7',
                height: '72px',
                zIndex: (theme) => theme.zIndex.appBar,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >

            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1700px',
                    px: '64px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                }}
            >

                <Box
                    component={NavLink}
                    to="/"
                    aria-label="TravelTrucks Home"
                    sx={{
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0,
                        zIndex: 1,
                        '&:hover': { opacity: 0.8 },
                    }}
                >
                    <svg width="136" height="16" viewBox="0 0 136 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="14" fontFamily="Inter" fontWeight="600" fontSize="16">
                            <tspan fill="#101828">Travel</tspan>
                            <tspan fill="#475467">Trucks</tspan>
                        </text>
                    </svg>
                </Box>


                <Box
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '32px',
                    }}
                >
                    {[
                        { to: '/', label: 'Home', end: true },
                        { to: '/catalog', label: 'Catalog', end: false },
                    ].map(({ to, label, end }) => (
                        <Box
                            key={to}
                            component={NavLink}
                            to={to}
                            end={end || undefined}
                            sx={{
                                textDecoration: 'none',
                                color: '#101828',
                                fontFamily: 'Inter',
                                fontSize: '16px',
                                fontWeight: 500,
                                lineHeight: '24px',
                                transition: 'color 0.2s',
                                '&:hover': { color: '#E44848' },
                                '&.active': { color: '#E44848' },
                            }}
                        >
                            {label}
                        </Box>
                    ))}
                </Box>


                <Box sx={{ width: '136px', flexShrink: 0 }} />
            </Box>
        </AppBar>
    );
};

export default Header;
