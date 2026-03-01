import type { Camper } from './camper';

export interface CatalogFilters {
    location: string;
    form: string;
    AC: boolean;
    transmission: boolean;
    kitchen: boolean;
    TV: boolean;
    bathroom: boolean;
}

export interface CatalogPageState {
    items: Camper[];
    total: number;
    page: number;
    isLoading: boolean;
    error: string | null;
    filters: CatalogFilters;
}

export interface CatalogPageActions {
    setFilters: (filters: Partial<CatalogFilters>) => void;
    search: () => void;
    loadMore: () => void;
    toggleFavorite: (id: string) => void;
}

export interface CatalogPageProps {
    state: CatalogPageState;
    actions: CatalogPageActions;
}
