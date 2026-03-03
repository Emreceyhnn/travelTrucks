import { NavLink } from 'react-router-dom';
import { AppBar, Box, Container } from '@mui/material';

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
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    maxWidth: 1440,
                    px: '64px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    component={NavLink}
                    to="/"
                    sx={{
                        textDecoration: 'none',
                        color: '#101828',
                        display: 'flex',
                        alignItems: 'center',
                        width: '136px',
                        height: '16px',
                        flex: 'none',
                        '&:hover': {
                            opacity: 0.8,
                        },
                    }}
                >
                    <svg width="136" height="16" viewBox="0 0 136 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="14" fontFamily="Inter" fontWeight="600" fontSize="16" fill="currentColor">TravelTrucks</text>
                    </svg>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '32px',
                        height: '24px',
                        flex: 'none',
                    }}
                >
                    <Box
                        component={NavLink}
                        to="/"
                        end
                        sx={{
                            textDecoration: 'none',
                            color: '#101828',
                            fontFamily: 'Inter',
                            fontSize: '16px',
                            fontWeight: 500,
                            lineHeight: '24px',
                            textAlign: 'center',
                            transition: 'color 0.2s',
                            '&:hover': {
                                color: '#D84343',
                            },
                            '&.active': {
                                color: '#D84343',
                            },
                        }}
                    >
                        Home
                    </Box>
                    <Box
                        component={NavLink}
                        to="/catalog"
                        sx={{
                            textDecoration: 'none',
                            color: '#101828',
                            fontFamily: 'Inter',
                            fontSize: '16px',
                            fontWeight: 500,
                            lineHeight: '24px',
                            textAlign: 'center',
                            transition: 'color 0.2s',
                            '&:hover': {
                                color: '#D84343',
                            },
                            '&.active': {
                                color: '#D84343',
                            },
                        }}
                    >
                        Catalog
                    </Box>
                </Box>
            </Container>
        </AppBar>
    );
};

export default Header;
