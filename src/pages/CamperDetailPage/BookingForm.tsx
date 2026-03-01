import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import type { BookingFormData } from '../../lib/type/camperDetail';
import styles from './BookingForm.module.css';

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
        <div className={styles.formCard}>
            <h3 className={styles.title}>Book your campervan now</h3>
            <p className={styles.subtitle}>
                Stay connected! We are always ready to help you.
            </p>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    className={styles.input}
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="bookingDate"
                    placeholder="Booking date*"
                    className={styles.input}
                    value={formData.bookingDate}
                    onChange={handleChange}
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => {
                        if (!e.target.value) e.target.type = 'text';
                    }}
                    required
                />
                <textarea
                    name="comment"
                    placeholder="Comment"
                    className={styles.textarea}
                    value={formData.comment}
                    onChange={handleChange}
                    rows={4}
                />
                <button type="submit" className={styles.submitBtn}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
