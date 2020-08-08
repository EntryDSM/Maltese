import type { AccessToken, User, PagenationPayload } from "./apiTypes";
export declare const responseStatus: (status: number) => {
    _200: boolean;
    _400: boolean;
    _401: boolean;
    _403: boolean;
    _404: boolean;
};
export declare const getChatsApi: (payload: AccessToken & PagenationPayload) => Promise<{
    data: User[];
    status: number;
}>;
