import axios from 'axios';
import type { CampersApiResponse, Camper } from '../lib/type/camper';

const api = axios.create({
    baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
});

export interface GetCampersParams {
    page?: number;
    limit?: number;
    location?: string;
    form?: string;
    AC?: boolean;
    transmission?: string;
    kitchen?: boolean;
    TV?: boolean;
    bathroom?: boolean;
}

export const getCampers = async (
    params: GetCampersParams
): Promise<CampersApiResponse> => {
    const queryParams: Record<string, string | number | boolean> = {};

    if (params.page) queryParams.page = params.page;
    if (params.limit) queryParams.limit = params.limit;
    if (params.location) queryParams.location = params.location;
    if (params.form) queryParams.form = params.form;
    if (params.AC) queryParams.AC = true;
    if (params.transmission) queryParams.transmission = params.transmission;
    if (params.kitchen) queryParams.kitchen = true;
    if (params.TV) queryParams.TV = true;
    if (params.bathroom) queryParams.bathroom = true;

    const response = await api.get<CampersApiResponse>('/campers', {
        params: queryParams,
    });
    return response.data;
};

export const getCamperById = async (id: string): Promise<Camper> => {
    const response = await api.get<Camper>(`/campers/${id}`);
    return response.data;
};
