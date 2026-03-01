import type { Camper } from './camper';

export interface BookingFormData {
    name: string;
    email: string;
    bookingDate: string;
    comment: string;
}

export interface CamperDetailPageState {
    camper: Camper | null;
    isLoading: boolean;
    error: string | null;
    activeTab: 'features' | 'reviews';
}

export interface CamperDetailPageActions {
    setActiveTab: (tab: 'features' | 'reviews') => void;
    submitBooking: (data: BookingFormData) => void;
}

export interface CamperDetailPageProps {
    state: CamperDetailPageState;
    actions: CamperDetailPageActions;
}
