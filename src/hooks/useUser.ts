import graphqlRequest from "@/api/api";
import { GET_USER_BY_USERNAME_SEARCH_MUTATION, GET_USER_DATA_MUTATION, UPDATE_USER_PASSWORD_MUTATION } from "@/mutation/user";
import { useUserStore } from "@/store/useUserStore";
import { useUsersStore } from "@/store/useUsersStore";
import { IUser } from "@/types/user";
import { isEmpty } from "@/utils/helper";
import { useCallback, useState } from "react";

interface BaseUser {
    resetError: () => void;
    loading: boolean;
    error: string | null;
}

interface UseUser extends BaseUser {
    getUser: () => Promise<boolean>;
    user: IUser | null,
}

interface UseUpdatePassword extends BaseUser {
    updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
}

interface UseSearchUsers extends BaseUser {
    users: IUser[] | null;
    getUsersByUsernameSearch: (username: string, cursor: string, type: 'append' | 'set') => Promise<boolean>;
    loadMoreUserSearch: (query: string) => void;
}

export const useUser = (): UseUser => {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const getUser = async (): Promise<boolean> => {
        setLoading(true);
        setError('');
        try {
            const { data, errors } = await graphqlRequest(GET_USER_DATA_MUTATION);
            setLoading(false);
            if(!isEmpty(errors)) {
                setError(errors[0].message);
                return false;
            }

            const { user } = data;
            if(!isEmpty(user)) {
                setUser(user);
            }
            setLoading(false);
            return true;
        } catch(err: any) {
            setError(err?.response?.data?.message || 'Cannot fetch user data');
            setLoading(false);
            return false;
        }
    };

    const resetError = () => {
        setError('');
    }

    return {
        getUser,
        resetError,
        user,
        loading,
        error
    };
};

export const useUpdatePassword = (): UseUpdatePassword => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
        setLoading(true);
        setError('');
        try {
            const { data, errors } = await graphqlRequest(UPDATE_USER_PASSWORD_MUTATION, { oldPassword, newPassword });
            setLoading(false);
            if(!isEmpty(errors)) {
                setError(errors[0].message);
                return false;
            }
            if(!data?.user?.success) {
                setError('Cannot update user password');
                return false;
            }
            return true;
        } catch(err: any) {
            let message = err?.response?.data?.message || 'Cannot update user password'
            const errors = err?.response?.data?.errors;
            if(errors) {
                message = errors[0].message
            }
            setError(message);
            setLoading(false);
            return false;
        }
    };

    const resetError = () => {
        setError('');
    }

    return {
        updatePassword,
        resetError,
        loading,
        error
    };
}

export const useSearchUsers = (): UseSearchUsers => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const { users, hasNextPage, endCursor, setUsers, appendBulkUsers, setPagination } = useUsersStore();
    const getUsersByUsernameSearch = async (username: string, cursor: string, type: 'append'| 'set'): Promise<boolean> => {
        setLoading(true);
        setError('');
        try {
            const { data, errors } = await graphqlRequest(GET_USER_BY_USERNAME_SEARCH_MUTATION, { username, cursor, limit: 10 });
            setLoading(false);
            if(!isEmpty(errors)) {
                setError(errors[0].message);
                return false
            }
            const { users } = data;
            if(!users) {
                return false
            }
            if (type === 'append') {
                appendBulkUsers(users.users);
            } else if (type === 'set') {
                setUsers(users.users)
            }   
            setPagination(users.endCursor, users.hasNextPage);
            return true;
        } catch(err: any) {
            setError(err?.response?.data?.message || 'Cannot fetch user data');
            setLoading(false);
            return false
        }
    };

    const loadMoreUserSearch = useCallback((username: string) => {
        if(hasNextPage && !isEmpty(username)) {
            getUsersByUsernameSearch(username, endCursor, 'append');
        }
    }, [endCursor, hasNextPage]);

    const resetError = () => {
        setError('');
    }

    return {
        getUsersByUsernameSearch,
        loadMoreUserSearch,
        resetError,
        users,
        loading,
        error
    };
};