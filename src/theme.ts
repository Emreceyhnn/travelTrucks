import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#e44848',
            dark: '#d03b3b',
        },
        warning: {
            main: '#ffc531',
        },
        text: {
            primary: '#101828',
            secondary: '#475467',
            disabled: '#6c717b',
        },
        background: {
            default: '#ffffff',
        },
        divider: '#dadde1',
        grey: {
            50: '#f7f7f7', // Inputs background
            100: '#f2f4f7', // Badge background
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        allVariants: {
            color: '#101828',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 200,
                    textTransform: 'none',
                    boxShadow: 'none',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                contained: {
                    padding: '16px 56px',
                    fontSize: '16px',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backgroundColor: '#f7f7f7',
                    '& fieldset': {
                        border: 'none',
                    },
                    '& input': {
                        padding: '16px',
                        fontSize: '16px',
                    },
                    '& input::placeholder': {
                        color: '#6c717b',
                        opacity: 1,
                    },
                },
            },
        },
    },
});

export default theme;
