
export interface IUser {
    id: string;
    username: string;
    displayName: string;
    description?: string;
    createdAt: number;
    avatar: string;
    updatedAt: string;
    tsismisCount: number;
    likesCount: number;
    favoritesCount: number;
}