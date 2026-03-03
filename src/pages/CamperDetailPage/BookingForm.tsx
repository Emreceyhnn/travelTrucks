import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import type { BookingFormData } from '../../lib/type/camperDetail';
import { Box, Typography, TextField, Button } from '@mui/material';

const BookingForm: React.FC = () => {
    const [formData, setFormData] = useState<BookingFormData>({
        name: '',
        email: '',
        bookingDate: '',
        comment: '',
    });

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (!formData.name || !formData.email || !formData.bookingDate) {
                toast.error('Please fill in all required fields');
                return;
            }
            toast.success('Booking successful! We will contact you soon.');
            setFormData({ name: '', email: '', bookingDate: '', comment: '' });
        },
        [formData]
    );

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '20px',
                p: '40px',
                position: 'sticky',
                top: '88px'
            }}
        >
            <Typography variant="h3" sx={{ fontSize: '20px', fontWeight: 600, color: 'text.primary', mb: '8px' }}>
                Book your campervan now
            </Typography>
            <Typography sx={{ fontSize: '16px', color: 'text.secondary', mb: '24px', lineHeight: 1.5 }}>
                Stay connected! We are always ready to help you.
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
                <TextField
                    type="text"
                    name="name"
                    placeholder="Name*"
                    variant="outlined"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    type="email"
                    name="email"
                    placeholder="Email*"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    type="text"
                    name="bookingDate"
                    placeholder="Booking date*"
                    variant="outlined"
                    fullWidth
                    value={formData.bookingDate}
                    onChange={handleChange}
                    onFocus={(e) => ((e.target as HTMLInputElement).type = 'date')}
                    onBlur={(e) => {
                        if (!e.target.value) (e.target as HTMLInputElement).type = 'text';
                    }}
                    required
                />
                <TextField
                    name="comment"
                    placeholder="Comment"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.comment}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: '10px' }}
                >
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default BookingForm;
