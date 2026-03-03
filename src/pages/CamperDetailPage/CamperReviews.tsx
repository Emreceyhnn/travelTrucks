import type { CamperReview } from '../../lib/type/camper';
import { Box, Typography, Avatar } from '@mui/material';

interface CamperReviewsProps {
    reviews: CamperReview[];
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <Box sx={{ display: 'flex', gap: '2px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill={star <= rating ? '#FFC531' : '#F2F4F7'}
                >
                    <path d="M8 0l2.47 4.93L16 5.76l-4 3.82L12.94 16 8 13.27 3.06 16 4 9.58 0 5.76l5.53-.83L8 0z" />
                </svg>
            ))}
        </Box>
    );
};

const CamperReviews: React.FC<CamperReviewsProps> = ({ reviews }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {reviews.map((review, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Avatar
                            sx={{
                                width: 60, height: 60, bgcolor: 'grey.100',
                                color: 'primary.main', fontSize: '24px', fontWeight: 600
                            }}
                        >
                            {review.reviewer_name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography sx={{ fontSize: '18px', fontWeight: 600, color: 'text.primary', mb: '4px' }}>
                                {review.reviewer_name}
                            </Typography>
                            <StarRating rating={review.reviewer_rating} />
                        </Box>
                    </Box>
                    <Typography sx={{ fontSize: '16px', color: 'text.secondary', lineHeight: 1.5, m: 0 }}>
                        {review.comment}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default CamperReviews;
