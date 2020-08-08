import axios, { AxiosError } from "axios";
import type { AccessToken, User, PagenationPayload } from "./apiTypes";
import { baseURL } from "./endpoints";

export const responseStatus = (status: number) => {
  return {
    _200: status === 200,
    _400: status === 400,
    _401: status === 401,
    _403: status === 403,
    _404: status === 404,
  };
};

const authorizationHeader = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
});

const instanceAxios = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const getChatsApi = async (payload: AccessToken & PagenationPayload) => {
  try {
    const response = await instanceAxios.get<User[]>("/v5/qna/chats", {
      headers: authorizationHeader(payload.accessToken),
      params: {
        page: payload.page,
      },
    });

    return { data: response.data, status: response.status };
  } catch (_err) {
    const err = _err as AxiosError<null>;

    return { data: [] as User[], status: err.response?.status || 0 };
  }
};
