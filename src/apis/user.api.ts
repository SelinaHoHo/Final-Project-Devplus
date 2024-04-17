import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import { ILoginRequest, ILoginResponse } from "@/interfaces/login/login.interface";
import { IGetUsers, IUsers } from "@/interfaces/user/users.interface";
import { AxiosResponse } from "axios";

export const getUsers = (): Promise<AxiosResponse<IUsers>> => instance.get(API_URL.USERS);
export const getAllUserNoPagination = (): Promise<AxiosResponse<IGetUsers>> =>
  instance.get(API_URL.GETALLUSER);
export const postLogin = (data: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> =>
  instance.post(API_URL.LOGIN, data);
