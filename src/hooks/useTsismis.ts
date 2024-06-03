import graphqlRequest from "@/api/api";
import {
    DELETE_TSISMIS_MUTATION,
    FAVORITE_TSISMIS_MUTATION,
    GET_OWN_FAVORITE_TSISMIS_MUTATION,
    GET_OWN_TSISMIS_MUTATION,
    GET_TSISMIS_BY_SEARCH_MUTATION,
    GET_TSISMIS_BY_USERNAME_MUTATION,
    GET_TSISMIS_MUTATION,
    LIKE_TSISMIS_MUTATION,
    POST_TSISMIS_MUTATION,
    UNFAVORITE_TSISMIS_MUTATION,
    UNLIKE_TSISMIS_MUTATION,
    UPDATE_TSISMIS_MUTATION
} from "@/mutation/tsismis";
import { useTsimsisStore } from "@/store/useTsismisStore";
import { isEmpty } from "@/utils/helper";
import { useCallback, useEffect, useState } from "react";


interface IUseTsismis {
    resetError: () => void;
    loading: boolean;
    error: string | null;
}

interface IUsePostTsismis extends IUseTsismis {
    postTsismis: (message: string, tags: string[]) => Promise<boolean>;
}

interface IUseDeleteTsismis {
    deleteTsismis: (id: string) => Promise<boolean>;
}

interface IUseUpdateTsismis extends IUseTsismis {
    updateTsismis: (id: string, message: string, tags: string[]) => Promise<boolean>;
}

interface IUseGetTsismis extends IUseTsismis {
    getTsismis: (cursor: string) => Promise<boolean>;
    getOwnUserTsismis: (cursor: string) => Promise<boolean>;
    getTsismisByUsername: (username: string, cursor: string) => Promise<boolean>;
    getTsismisBySearch: (query: string, cursor: string, type: 'append'|'set') => Promise<boolean>;
    getOwnUserFavoriteTsismis: (cursor: string) => Promise<boolean>;
    loadMoreHomeTsimis: () => void;
    loadMoreProfileTsimis: () => void;
    loadMoreProfileVisitTsimis: (username: string) => void;
    loadMoreFavoriteTsimis: () => void;
    loadMoreSearchTsismis: (query: string) => void;
}

interface IUseLikeTsismis {
    likeTsismis: (id: string) => Promise<boolean>;
    unLikeTsismis: (id: string) => Promise<boolean>;
}

interface IUseFavoriteTsismis {
    favoriteTsismis: (id: string) => Promise<boolean>;
    unfavoriteTsismis: (id: string) => Promise<boolean>;
}

export const usePostTsismis = (): IUsePostTsismis => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const { prependTsismis } = useTsimsisStore();
    const postTsismis = async (message: string, tags: string[]): Promise<boolean> => {
        setLoading(true);
        setError('');
        try {
            const { data, errors } = await graphqlRequest(POST_TSISMIS_MUTATION, { message, tags });
            setLoading(false);

            if(!isEmpty(errors) || !data || isEmpty(data)) {
                setError(errors[0].message);
                return false;
            }
            const { tsismis } = data;
            if(!tsismis) {
                setError('Cannot create tsismis at the moment');
                return false;
            }
            prependTsismis(tsismis);
            return true;
        } catch(err: any) {
            setError(err?.response?.data?.message || 'Cannot create tsismis at the moment');
            setLoading(false);
            return false;
        }
    };

    const resetError = () => {
        setError('');
    }

    return {
        postTsismis,
        resetError,
        loading,
        error
    };
};

export const useDeleteTsismis = (): IUseDeleteTsismis => {
    const { removeTsismis } = useTsimsisStore();
    const deleteTsismis = async (id: string): Promise<boolean> => {
        try {
            const { data, errors } = await graphqlRequest(DELETE_TSISMIS_MUTATION, { id });
            if(!isEmpty(errors) || !data || isEmpty(data)) {
                return false;
            }
            const { tsismis } = data;
            const { success } = tsismis;
            if(!success) {
                return false;
            }
            removeTsismis(id);
            return true;
        } catch(err: any) {
            return false;
        }
    };

    return {
        deleteTsismis,
    };
};

export const useUpdateTsimis = (): IUseUpdateTsismis => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const { updateTsimis } = useTsimsisStore();
    const updateTsismis = async (id: string, message: string, tags: string[]): Promise<boolean> => {
        setLoading(true);
        setError('');
        try {
            const { data, errors } = await graphqlRequest(UPDATE_TSISMIS_MUTATION, { id, message, tags });
            setLoading(false);

            if(!isEmpty(errors) || !data || isEmpty(data)) {
                setError(errors[0].message);
                return false;
            }
            const { tsismis } = data;
            if(!tsismis) {
                setError('Cannot update tsismis at the moment');
                return false;
            }
            updateTsimis(id, tsismis);
            return true;
        } catch(err: any) {
            setError(err?.response?.data?.message || 'Cannot update tsismis at the moment');
            setLoading(false);
            return false;
        }
    };

    const resetError = () => {
        setError('');
    }

    return {
        updateTsismis,
        resetError,
        loading,
        error
    };
};


export const useGetTsismis = (): IUseGetTsismis => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const { hasNextPage, endCursor, setPagination, setTsismis, appendBulkTsismis } = useTsimsisStore();
    const getTsismis = async (cursor: string): Promise<boolean> => {
        setLoading(true);
        setError('');
        try {
            const { data, errors } = await graphqlRequest(GET_TSISMIS_MUTATION, { cursor, limit: 10 });
            setLoading(false);
            if(!isEmpty(errors)) {
                setError(errors[0].message);
                return false;
            }
            const { tsismis } = data;
            if(!tsismis) {
                return false;
            }
            setPagination(tsismis.endCursor, tsismis.hasNextPage);
            appendBulkTsismis(tsismis.tsismis);
            return true;
        } catch(err: any) {
            setError(err?.response?.data?.message || 'Cannot fetch user data');
            setLoading(false);
            return false;
        }
    };

    const loadMoreHomeTsimis = useCallback(() => {
        if(hasNextPage) {
            getTsismis(endCursor);
        }
    }, [endCursor, hasNextPage]);


    const getOwnUserTsismis = async (cursor: string): Promise<boolean> => {
        setLoading(true);
        setError('');
        try {
            const { data, errors } = await graphqlRequest(GET_OWN_TSISMIS_MUTATION, { cursor, limit: 10 });
            setLoading(false);
            if(!isEmpty(errors)) {
                setError(errors[0].message);
                return false;
            }
            const { tsismis } = data;
            if(!tsismis) {
                return false;
            }
            setPagination(tsismis.endCursor, tsismis.hasNextPage);
            appendBulkTsismis(tsismis.tsismis);
            return true;
        } catch(err: any) {
            setError(err?.response?.data?.message || 'Cannot fetch user data');
            setLoading(false);
            return false;
        }
    };

    const loadMoreProfileTsimis = useCallback(() => {
        if(hasNextPage) {
            getOwnUserTsismis(endCursor);
        }
    }, [endCursor, hasNextPage]);


    const getTsismisByUsername = async (username: string, cursor: string): Promise<boolean> => {
        setLoading(true);
        setError('');
        try {
            const { data, errors } = await graphqlRequest(GET_TSISMIS_BY_USERNAME_MUTATION, { username, cursor: cursor, limit: 10 });
            setLoading(false);
            if(!isEmpty(errors)) {
                setError(errors[0].message);
                return false
            }
            const { tsismis } = data;
            if(!tsismis) {
                return false
            }
            setPagination(tsismis.endCursor, tsismis.hasNextPage);
            appendBulkTsismis(tsismis.tsismis);
            return true
        } catch(err: any) {
            setError(err?.response?.data?.message || 'Cannot fetch user data');
            setLoading(false);
            return false
        }
    };

    const loadMoreProfileVisitTsimis = useCallback((username: string) => {
        if(hasNextPage && !isEmpty(username)) {
            getTsismisByUsername(username, endCursor);
        }
    }, [endCursor, hasNextPage]);


    const getOwnUserFavoriteTsismis = async (cursor: string): Promise<boolean> => {
        setLoading(true);
        setError('');
        try {
            const { data, errors } = await graphqlRequest(GET_OWN_FAVORITE_TSISMIS_MUTATION, { cursor, limit: 10 });
            setLoading(false);
            if(!isEmpty(errors)) {
                setError(errors[0].message);
                return false;
            }
            const { tsismis } = data;
            if(!tsismis) {
                return false;
            }
            setPagination(tsismis.endCursor, tsismis.hasNextPage);
            appendBulkTsismis(tsismis.tsismis);
            return true;
        } catch(err: any) {
            setError(err?.response?.data?.message || 'Cannot fetch user data');
            setLoading(false);
            return false
        }
    };

    const loadMoreFavoriteTsimis = useCallback(() => {
        if(hasNextPage) {
            getOwnUserFavoriteTsismis(endCursor);
        }
    }, [endCursor, hasNextPage]);

    const getTsismisBySearch = async (query: string, cursor: string, type: 'append' | 'set'): Promise<boolean> => {
        setLoading(true);
        setError('');
        try {
            const { data, errors } = await graphqlRequest(GET_TSISMIS_BY_SEARCH_MUTATION, { query, cursor, limit: 10 });
            setLoading(false);
            if(!isEmpty(errors)) {
                setError(errors[0].message);
                return false
            }
            const { tsismis } = data;
            if(!tsismis) {
                return false
            }
            if (type === 'append') {
                appendBulkTsismis(tsismis.tsismis);
            } else if (type === 'set') {
                setTsismis(tsismis.tsismis)
            }   
            setPagination(tsismis.endCursor, tsismis.hasNextPage);
            return true;
        } catch(err: any) {
            setError(err?.response?.data?.message || 'Cannot fetch user data');
            setLoading(false);
            return false;
        }
    };

    const loadMoreSearchTsismis = useCallback((query: string) => {
        if(hasNextPage && !isEmpty(query)) {
            getTsismisBySearch(query, endCursor, 'append');
        }
    }, [endCursor, hasNextPage]);


    const resetError = () => {
        setError('');
    }

    return {
        getTsismis,
        getOwnUserTsismis,
        getTsismisByUsername,
        getOwnUserFavoriteTsismis,
        getTsismisBySearch,
        resetError,
        loadMoreHomeTsimis,
        loadMoreProfileTsimis,
        loadMoreProfileVisitTsimis,
        loadMoreFavoriteTsimis,
        loadMoreSearchTsismis,
        loading,
        error
    };
};

export const useLikeTsismis = (): IUseLikeTsismis => {
    const { appendLike, removeLike } = useTsimsisStore();
    const likeTsismis = async (id: string): Promise<boolean> => {
        try {
            const { data, errors } = await graphqlRequest(LIKE_TSISMIS_MUTATION, { id });
            if(!isEmpty(errors) || !data || isEmpty(data)) {
                return false;
            }
            const { tsismis } = data;
            if(!tsismis) {
                return false;
            }
            appendLike(id);
            return true;
        } catch(err: any) {
            return false;
        }
    };

    const unLikeTsismis = async (id: string): Promise<boolean> => {
        try {
            const { data, errors } = await graphqlRequest(UNLIKE_TSISMIS_MUTATION, { id });
            if(!isEmpty(errors) || !data || isEmpty(data)) {
                return false;
            }
            const { tsismis } = data;
            if(!tsismis) {
                return false;
            }
            removeLike(id);
            return true;
        } catch(err: any) {
            return false;
        }
    };
    return {
        likeTsismis,
        unLikeTsismis
    }
}

export const useFavoriteTsimis = (): IUseFavoriteTsismis => {
    const { appendFavorite, removeFavorite } = useTsimsisStore();

    const favoriteTsismis = async (id: string): Promise<boolean> => {
        try {
            const { data, errors } = await graphqlRequest(FAVORITE_TSISMIS_MUTATION, { id });
            if(!isEmpty(errors) || !data || isEmpty(data)) {
                return false;
            }
            const { tsismis } = data;
            if(!tsismis) {
                return false;
            }
            appendFavorite(id);
            return true;
        } catch(err: any) {
            return false;
        }
    };

    const unfavoriteTsismis = async (id: string): Promise<boolean> => {
        try {
            const { data, errors } = await graphqlRequest(UNFAVORITE_TSISMIS_MUTATION, { id });
            if(!isEmpty(errors) || !data || isEmpty(data)) {
                return false;
            }
            const { tsismis } = data;
            if(!tsismis) {
                return false;
            }
            removeFavorite(id);
            return true;
        } catch(err: any) {
            return false;
        }
    };
    return {
        favoriteTsismis,
        unfavoriteTsismis
    }
}


export const useRefreshTsismis = (loadMore: () => void) => {
    const clearTsismis = useTsimsisStore((state) => state.clearTsismis);
    useEffect(() => {
        clearTsismis();
        loadMore();
    }, [clearTsismis]);
};