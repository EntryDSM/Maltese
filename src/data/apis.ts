import axios, { AxiosError } from "axios";
import type { AccessToken, User } from "./apiTypes";

const baseURL = "https://api.entrydsm.hs.kr";

const authorizationHeader = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
});

const instanceAxios = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const getChatsApi = async (payload: AccessToken) => {
  try {
    const response = await instanceAxios.get<User>("/schnauzer/chats", {
      headers: authorizationHeader(payload.accessToken),
    });

    return [response.data, response.status];
  } catch (_err) {
    const err: AxiosError = _err;

    return [null, err.response.status];
  }
};
