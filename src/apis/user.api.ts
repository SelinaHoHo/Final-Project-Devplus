import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import { ILanguage } from "@/interfaces/langs/langs.interface";
import { ILoginRequest, ILoginResponse } from "@/interfaces/login/login.interface";
import { IPositions } from "@/interfaces/position/positions.interface";
import { ITechnology } from "@/interfaces/tech/tech.interface";
import {
  DeleteUser,
  GetListUsers,
  IAssignEmployee,
  IGetUsers,
  IUserDetail,
  IUsers,
} from "@/interfaces/user/users.interface";
import { AxiosResponse } from "axios";

export const getAllUserNoPagination = (): Promise<AxiosResponse<IGetUsers>> =>
  instance.get(API_URL.GETALLUSER);

export const getUsers = (param: GetListUsers): Promise<AxiosResponse<IUsers>> =>
  instance.get(API_URL.USERS, { params: param });

export const postLogin = (data: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> =>
  instance.post(API_URL.LOGIN, data);

/* Create User */
export const getLanguages = (): Promise<AxiosResponse<ILanguage[]>> =>
  instance.get(API_URL.LANGUAGE);

export const getTechnologies = (): Promise<AxiosResponse<ITechnology[]>> =>
  instance.get(API_URL.TECHNOLOGY);

export const getPositions = (): Promise<AxiosResponse<IPositions[]>> =>
  instance.get(API_URL.POSITION);

export const createUser = (data: string[]): Promise<AxiosResponse<string[]>> =>
  instance.post(API_URL.CREATE_USER, data);

export const profile = (data: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> =>
  instance.post(API_URL.LOGIN, data);

export const deleteUser = (param: DeleteUser): Promise<AxiosResponse<IUsers>> =>
  instance.delete(`${API_URL.USERS}?id=${param.id}`);

export const getDetailEmoloyee = (id: string): Promise<AxiosResponse<IUserDetail>> =>
  instance.get(`${API_URL.USERS}/${id}`);
export const addEmployeeToProject = (data: IAssignEmployee): Promise<AxiosResponse<string[]>> =>
  instance.post(API_URL.ADD_EMPLOYEE, data);

export const unassignEmployeeToProject = (id: string) =>
  instance.delete(`${API_URL.UNASSIGN_EMPLOYEE}/${id}`);
