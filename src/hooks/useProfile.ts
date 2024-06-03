import graphqlRequest from "@/api/api";
import { GET_USER_BY_USERNAME_MUTATION, UPDATE_USER_PROFILE_MUTATION } from "@/mutation/user";
import { useProfileStore } from "@/store/useProfileStore";
import { IUser } from "@/types/user";
import { isEmpty } from "@/utils/helper";
import { useState } from "react";

interface UseBaseProfile {
    profile: IUser | null,
    loading: boolean;
    error: string | null;
    resetError: () => void;
}
interface UseProfile extends UseBaseProfile {
    getUserByUsername: (username: string | null) => Promise<boolean>;
}

interface UseUpdateProfile extends UseBaseProfile {
    updateUserProfile: (displayName: string, description: string) => Promise<boolean>;
}

export const useProfile = (): UseProfile => {
    const profile = useProfileStore((state) => state.profile);
    const setProfile = useProfileStore((state) => state.setProfile);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const getUserByUsername = async (username: string | null): Promise<boolean> => {
        setLoading(true);
        setError('');
        try {
            const { data, errors } = await graphqlRequest(GET_USER_BY_USERNAME_MUTATION, { username, });
            setLoading(false);
            if(!isEmpty(errors)) {
                setError(errors[0].message);
                return false;
            }
            const { user } = data;
            if(!isEmpty(user)) {
                setProfile(user);
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
        getUserByUsername,
        resetError,
        profile,
        loading,
        error
    };
};

export const UseUpdateProfile = (): UseUpdateProfile => {
    const profile = useProfileStore((state) => state.profile);
    const setProfile = useProfileStore((state) => state.setProfile);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const updateUserProfile = async (displayName: string, description: string): Promise<boolean> => {
        setLoading(true);
        setError('');
        try {
            const { data, errors } = await graphqlRequest(UPDATE_USER_PROFILE_MUTATION, { displayName, description });
            setLoading(false);
            if(!isEmpty(errors)) {
                setError(errors[0].message);
                return false;
            }
            const { user } = data;
            if(!isEmpty(user)) {
                setProfile(user);
            }
            setLoading(false);
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
        updateUserProfile,
        resetError,
        profile,
        loading,
        error
    };
};