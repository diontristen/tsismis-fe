import { IUser } from "./user";

export interface ITsismis {
    id: string;
    message: string;
    tags: string[];
    createdAt: number;
    user: IUser;
    likes: number;
    hasLiked: boolean;
    favorites: number;
    hasFavorited: boolean;
}