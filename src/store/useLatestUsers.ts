import { IUser } from '@/types/user';
import { create } from 'zustand';

interface LatestUsersStore {
    latestUsers: IUser[] | null;
    setLatestUsers: (latestUsers: IUser[] | null) => void;
    clearLatestUsers: () => void;
}

export const useLatestUsersStore = create<LatestUsersStore>((set) => ({
    latestUsers: null,
    setLatestUsers: (latestUsers) => set({ latestUsers }),
    clearLatestUsers: () => set({ latestUsers: null })
}))