import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Camper } from '../lib/type/camper';
import type { CatalogFilters } from '../lib/type/catalog';
import { getCampers, getCamperById } from '../services/api';

const ITEMS_PER_PAGE = 4;

interface CampersState {
    items: Camper[];
    total: number;
    page: number;
    isLoading: boolean;
    error: string | null;
    filters: CatalogFilters;
    selectedCamper: Camper | null;
    selectedCamperLoading: boolean;
    selectedCamperError: string | null;
}

const initialFilters: CatalogFilters = {
    location: '',
    form: '',
    AC: false,
    transmission: false,
    kitchen: false,
    TV: false,
    bathroom: false,
};

const initialState: CampersState = {
    items: [],
    total: 0,
    page: 1,
    isLoading: false,
    error: null,
    filters: initialFilters,
    selectedCamper: null,
    selectedCamperLoading: false,
    selectedCamperError: null,
};

export const fetchCampers = createAsyncThunk(
    'campers/fetchCampers',
    async (
        { page, filters }: { page: number; filters: CatalogFilters },
        thunkAPI
    ) => {
        try {
            const params: Record<string, string | number | boolean> = {
                page,
                limit: ITEMS_PER_PAGE,
            };

            if (filters.location) params.location = filters.location;
            if (filters.form) params.form = filters.form;
            if (filters.AC) params.AC = true;
            if (filters.transmission) params.transmission = 'automatic';
            if (filters.kitchen) params.kitchen = true;
            if (filters.TV) params.TV = true;
            if (filters.bathroom) params.bathroom = true;

            const data = await getCampers(params);
            return { items: data.items, total: data.total, page };
        } catch {
            return thunkAPI.rejectWithValue('Failed to fetch campers');
        }
    }
);

export const fetchCamperById = createAsyncThunk(
    'campers/fetchCamperById',
    async (id: string, thunkAPI) => {
        try {
            const data = await getCamperById(id);
            return data;
        } catch {
            return thunkAPI.rejectWithValue('Failed to fetch camper details');
        }
    }
);

const campersSlice = createSlice({
    name: 'campers',
    initialState,
    reducers: {
        setFilters(state, action) {
            state.filters = { ...state.filters, ...action.payload };
        },
        resetCampers(state) {
            state.items = [];
            state.total = 0;
            state.page = 1;
        },
        clearSelectedCamper(state) {
            state.selectedCamper = null;
            state.selectedCamperError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCampers.fulfilled, (state, action) => {
                state.isLoading = false;
                const { items, total, page } = action.payload;
                if (page === 1) {
                    state.items = items;
                } else {
                    state.items = [...state.items, ...items];
                }
                state.total = total;
                state.page = page;
            })
            .addCase(fetchCampers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCamperById.pending, (state) => {
                state.selectedCamperLoading = true;
                state.selectedCamperError = null;
            })
            .addCase(fetchCamperById.fulfilled, (state, action) => {
                state.selectedCamperLoading = false;
                state.selectedCamper = action.payload;
            })
            .addCase(fetchCamperById.rejected, (state, action) => {
                state.selectedCamperLoading = false;
                state.selectedCamperError = action.payload as string;
            });
    },
});

export const { setFilters, resetCampers, clearSelectedCamper } =
    campersSlice.actions;
export default campersSlice.reducer;
