import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import { ILanguage } from "@/interfaces/langs/langs.interface";
import { ILoginRequest, ILoginResponse } from "@/interfaces/login/login.interface";
import { IPosition } from "@/interfaces/positions/positions.interface";
import { ITechnology } from "@/interfaces/tech/tech.interface";
import { IGetUsers, IUsers } from "@/interfaces/user/users.interface";
import { AxiosResponse } from "axios";

export const getUsers = (): Promise<AxiosResponse<IUsers>> => instance.get(API_URL.USERS);
export const getAllUserNoPagination = (): Promise<AxiosResponse<IGetUsers>> =>
  instance.get(API_URL.GETALLUSER);
export const postLogin = (data: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> =>
  instance.post(API_URL.LOGIN, data);

/* Create User */
export const getLanguages = (): Promise<AxiosResponse<ILanguage[]>> =>
  instance.get(API_URL.LANGUAGE);

export const getTechnologies = (): Promise<AxiosResponse<ITechnology[]>> =>
  instance.get(API_URL.TECHNOLOGY);

export const getPositions = (): Promise<AxiosResponse<IPosition[]>> =>
  instance.get(API_URL.POSITION);

export const createUser = (data: string[]): Promise<AxiosResponse<string[]>> =>
  instance.post(API_URL.CREATE_USER, data);
