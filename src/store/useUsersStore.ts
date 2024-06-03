import { IUser } from '@/types/user';
import { removeDuplicates } from '@/utils/helper';
import { create } from 'zustand';

interface UsersStore {
    users: IUser[] | null;
    endCursor: string;
    hasNextPage: boolean;
    setUsers: (users: IUser[]) => void;
    appendBulkUsers: (users: IUser[]) => void;
    setPagination: (endCursor: string, hasNextPage: boolean) => void;
    clearUsers: () => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
    users: null,
    endCursor: '',
    hasNextPage: true,
    setUsers: (users) => set({ users }),
    setPagination: (endCursor, hasNextPage) => set({ endCursor, hasNextPage }),
    appendBulkUsers: (users) => set((state) => {
        if(state.users && state.users.length > 0) {
            const possibleNewItems = [...state.users, ...users];
            const newItems =  removeDuplicates(possibleNewItems)
            return { users: newItems }
        } else {
            return { users: [...users] }
        }
    }),
    clearUsers: () => set({ users: null })
}))