import { Box, CircularProgress } from '@mui/material';

const Loader: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 8
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default Loader;
