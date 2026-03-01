import type { CamperReview } from '../../lib/type/camper';
import styles from './CamperReviews.module.css';

interface CamperReviewsProps {
    reviews: CamperReview[];
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className={styles.stars}>
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
        </div>
    );
};

const CamperReviews: React.FC<CamperReviewsProps> = ({ reviews }) => {
    return (
        <div className={styles.reviews}>
            {reviews.map((review, index) => (
                <div key={index} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                        <div className={styles.avatar}>
                            {review.reviewer_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className={styles.reviewerName}>{review.reviewer_name}</p>
                            <StarRating rating={review.reviewer_rating} />
                        </div>
                    </div>
                    <p className={styles.comment}>{review.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default CamperReviews;
