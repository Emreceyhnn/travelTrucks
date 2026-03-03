import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import backgroundImage from '/bgImage.webp';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            component="section"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: "black"
            }}
        >
            <Box
                sx={{
                    pt: '72px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',

                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                        display: 'flex',
                        transform: 'scaleX(-1)',
                    }}
                >
                    <Container
                        maxWidth={false}
                        sx={{
                            maxWidth: '1700px',
                            px: { xs: '20px', md: '80px' },
                            mx: 'auto',
                            position: 'relative',
                            zIndex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            transform: 'scaleX(-1)',
                        }}
                    >
                        <Box sx={{ maxWidth: 600 }}>
                            <Typography
                                variant="h1"
                                component="h1"
                                sx={{
                                    fontSize: { xs: '36px', md: '48px' },
                                    fontWeight: 600,
                                    color: '#ffffff',
                                    mb: '16px',
                                    lineHeight: 1.2,
                                }}
                            >
                                Campers of your dreams
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="p"
                                sx={{
                                    fontSize: { xs: '18px', md: '24px' },
                                    fontWeight: 600,
                                    color: '#ffffff',
                                    mb: '40px',
                                    lineHeight: 1.4,
                                }}
                            >
                                You can find everything you want in our catalog
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate('/catalog')}
                            >
                                View Now
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </Box>
    );
};

export default HomePage;
