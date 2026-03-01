export interface CamperGalleryImage {
    thumb: string;
    original: string;
}

export interface CamperReview {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
}

export interface Camper {
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
    description: string;
    form: 'alcove' | 'fullyIntegrated' | 'panelTruck';
    length: string;
    width: string;
    height: string;
    tank: string;
    consumption: string;
    transmission: 'automatic' | 'manual';
    engine: 'diesel' | 'petrol' | 'hybrid';
    AC: boolean;
    bathroom: boolean;
    kitchen: boolean;
    TV: boolean;
    radio: boolean;
    refrigerator: boolean;
    microwave: boolean;
    gas: boolean;
    water: boolean;
    gallery: CamperGalleryImage[];
    reviews: CamperReview[];
}

export interface CampersApiResponse {
    total: number;
    items: Camper[];
}
