import { ITsismis } from '@/types/tsismis';
import { create } from 'zustand';

interface ContextStore {
    createTsismisModalOpened: boolean;
    editTsismisModalOpened: boolean;
    selectedTsismis: ITsismis|null,
    toggleCreateTsismisModal: () => void;
    toggleEditTsismisModal: () => void;
    setSelectedTsismis: (tsismis: ITsismis) => void;
}

export const useContextStore = create<ContextStore>((set) => ({
    createTsismisModalOpened: false,
    editTsismisModalOpened: false,
    selectedTsismis: null,
    toggleCreateTsismisModal: () => set((state) => ({ createTsismisModalOpened: !state.createTsismisModalOpened })),
    toggleEditTsismisModal: () => set((state) => ({ editTsismisModalOpened: !state.editTsismisModalOpened })),
    setSelectedTsismis: (selectedTsismis) => set({ selectedTsismis }),
}))