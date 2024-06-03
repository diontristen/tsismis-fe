import { useState } from 'react';
import { AUTH_TOKEN } from '@/data/localStorage';
import { isEmpty } from '@/utils/helper';
import graphqlRequest from '@/api/api';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '@/mutation/auth';

interface UseLogin {
    login: (username: string, password: string) => Promise<boolean>;
    resetError: () => void;
    loading: boolean;
    error: string | null;
}

interface UseSignup {
    signup: (username: string, displayName: string, password: string) => Promise<boolean>;
    resetError: () => void;
    loading: boolean;
    error: string | null;
}


export const useLogin = (): UseLogin => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const login = async (username: string, password: string): Promise<boolean> => {
        setLoading(true);
        setError('');
        try {
            const { data, errors } = await graphqlRequest(LOGIN_MUTATION, {
                username, password
            });
            setLoading(false);
            if(!isEmpty(errors)) {
                setError(errors[0].message);
                return false;
            }
            const { token } = data.login;
            localStorage.setItem(AUTH_TOKEN, token);
            setLoading(false);
            return true;
        } catch(err: any) {
            setError(err?.response?.data?.message || 'Username and password do not match');
            setLoading(false);
            return false;
        }
    };

    const resetError = () => {
        setError('');
    }

    return { login, resetError, loading, error };
};

export const useLogout = () => {
    const logout = () => {
        localStorage.removeItem(AUTH_TOKEN);
    };

    return { logout };
}

export const useSignup = (): UseSignup => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const signup = async (username: string, displayName: string, password: string): Promise<boolean> => {
        setLoading(true);
        setError('');
        try {
            const { errors } = await graphqlRequest(SIGNUP_MUTATION, {
                username, displayName, password
            });
            setLoading(false);
            if(!isEmpty(errors)) {
                setError(errors[0].message);
                return false;
            }
            return true;
        } catch(err: any) {
            setError(err?.response?.data?.message || 'Failed to sign up');
            setLoading(false);
            return false;
        }
    };

    const resetError = () => {
        setError('');
    }


    return { signup, resetError, loading, error };
}
