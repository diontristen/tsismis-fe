import { ITsismis } from '@/types/tsismis';
import { removeDuplicates } from '@/utils/helper';
import { create } from 'zustand';

interface TsismisStore {
    tsismisList: ITsismis[] | null;
    endCursor: string;
    hasNextPage: boolean;
    setTsismis: (tsimis: ITsismis[]) => void;
    setPagination: (endCursor: string, hasNextPage: boolean) => void;
    prependTsismis: (tsimis: ITsismis) => void;
    appendBulkTsismis: (tsimis: ITsismis[]) => void;
    clearTsismis: () => void;
    updateTsimis: (id: string, tsismis: ITsismis) => void;
    removeTsismis: (id: string) => void;
    appendLike: (id: string) => void;
    removeLike: (id: string) => void;
    appendFavorite: (id: string) => void;
    removeFavorite: (id: string) => void;
}

export const useTsimsisStore = create<TsismisStore>((set) => ({
    tsismisList: null,
    endCursor: '',
    hasNextPage: true,
    setTsismis: (tsismisList) => set({ tsismisList }),
    setPagination: (endCursor, hasNextPage) => set({ endCursor, hasNextPage }),
    prependTsismis: (tsimis) => set((state) => {
        if(state.tsismisList && state.tsismisList.length > 0) {
            return { tsismisList: [tsimis, ...state.tsismisList] }
        } else {
            return { tsismisList: [tsimis] }
        }
    }),
    appendBulkTsismis: (tsimis) => set((state) => {
        if(state.tsismisList && state.tsismisList.length > 0) {
            const possibleNewItems = [...state.tsismisList, ...tsimis];
            const newItems =  removeDuplicates(possibleNewItems)
            return { tsismisList: newItems }
        } else {
            return { tsismisList: [...tsimis] }
        }
    }),
    clearTsismis: () => set({ tsismisList: [], endCursor: '', hasNextPage: true }),
    removeTsismis: (id) => set((state) => ({
        tsismisList: (state.tsismisList || []).filter(item => item.id !== id),
    })),
    updateTsimis: (id, tsismis) => set((state) => ({
        tsismisList: (state.tsismisList || []).map(item =>
            item.id === id ? { ...item, ...tsismis } : item
        ),
    })),
    appendLike: (id) =>
        set((state) => ({
            tsismisList: state.tsismisList
                ? state.tsismisList.map((item) =>
                    item.id === id ? { ...item, likes: item.likes + 1, hasLiked: true } : item
                )
                : null,
        })),
    removeLike: (id) =>
        set((state) => ({
            tsismisList: state.tsismisList
                ? state.tsismisList.map((item) =>
                    item.id === id ? { ...item, likes: item.likes - 1, hasLiked: false } : item
                )
                : null,
        })),
    appendFavorite: (id) =>
        set((state) => ({
            tsismisList: state.tsismisList
                ? state.tsismisList.map((item) =>
                    item.id === id ? { ...item, favorites: item.favorites + 1, hasFavorited: true } : item
                )
                : null,
        })),
    removeFavorite: (id) =>
        set((state) => ({
            tsismisList: state.tsismisList
                ? state.tsismisList.map((item) =>
                    item.id === id ? { ...item, favorites: item.favorites - 1, hasFavorited: false } : item
                )
                : null,
        })),
}))