import { IUser } from '@/types/user';
import { create } from 'zustand';

interface ProfileStore {
    profile: IUser | null;
    editProfileOpened: boolean;
    setProfile: (profile: IUser|null) => void;
    clearProfile: () => void;
    toggleEditProfileModal: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
    profile: null,
    editProfileOpened: false,
    setProfile: (profile) => set({ profile }),
    clearProfile: () => set({ profile: null }),
    toggleEditProfileModal: () => set((state) => ({ editProfileOpened: !state.editProfileOpened })),
}))