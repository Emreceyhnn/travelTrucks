import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
    ids: string[];
}

const loadFavorites = (): string[] => {
    try {
        const stored = localStorage.getItem('favorites');
        if (stored) {
            return JSON.parse(stored) as string[];
        }
    } catch {
        /* ignore parse errors */
    }
    return [];
};

const initialState: FavoritesState = {
    ids: loadFavorites(),
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<string>) {
            const id = action.payload;
            const index = state.ids.indexOf(id);
            if (index >= 0) {
                state.ids.splice(index, 1);
            } else {
                state.ids.push(id);
            }
            localStorage.setItem('favorites', JSON.stringify(state.ids));
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
