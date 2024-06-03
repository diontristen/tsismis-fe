import graphqlRequest from "@/api/api";
import { GET_LATEST_USERS_MUTATION } from "@/mutation/latesUsers";
import { useLatestUsersStore } from "@/store/useLatestUsers";
import { IUser } from "@/types/user";
import { isEmpty } from "@/utils/helper";
import { useState } from "react";
interface UseLatestUsers {
    getLatestUsers: () => Promise<boolean>;
    resetError: () => void;
    latestUsers: IUser[] | null,
    loading: boolean;
    error: string | null;
}
export const useLatestUsers = (): UseLatestUsers => {
    const { latestUsers, setLatestUsers } = useLatestUsersStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const getLatestUsers = async (): Promise<boolean> => {
        setLoading(true);
        setError('');
        try {
            const { data, errors } = await graphqlRequest(GET_LATEST_USERS_MUTATION);
            setLoading(false);
            if(!isEmpty(errors)) {
                setError(errors[0].message);
                return false;
            }
            const { users } = data;
            if(!isEmpty(users)) {
                setLatestUsers(users);
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
        getLatestUsers,
        resetError,
        latestUsers,
        loading,
        error
    };
};