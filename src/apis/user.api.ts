import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import { IUsers } from "@/interfaces/user/users.interface";
import { AxiosResponse } from "axios";

export const getUsers = (): Promise<AxiosResponse<IUsers>> => instance.get(API_URL.USERS);
