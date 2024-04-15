import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import { ILoginRequest, ILoginResponse } from "@/interfaces/login/login.interface";
import { GetListUsers, IUsers } from "@/interfaces/user/users.interface";
import { AxiosResponse } from "axios";

export const getUsers = (param: GetListUsers): Promise<AxiosResponse<IUsers>> =>
  instance.get(API_URL.USERS, { params: param });

export const postLogin = (data: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> =>
  instance.post(API_URL.LOGIN, data);

export const profile = (data: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> =>
  instance.post(API_URL.LOGIN, data);
