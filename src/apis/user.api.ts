/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import { ILanguage } from "@/interfaces/langs/langs.interface";
import { ILoginRequest, ILoginResponse } from "@/interfaces/login/login.interface";
import { IPositions } from "@/interfaces/position/positions.interface";
import { ITechnology } from "@/interfaces/tech/tech.interface";
import {
  DeleteUser,
  GetListUsers,
  GetUserById,
  IAssignEmployee,
  IGetCountUsers,
  IGetUsers,
  IUpdateUser,
  IUserDetail,
  IUsers,
  languageMember,
  languageMemberAdd,
  technicalMember,
  technicalMemberAdd,
} from "@/interfaces/user/users.interface";
import { AxiosResponse } from "axios";
import { Buffer } from "buffer";

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

export const exportCv = async (id: string) =>
  await instance
    .get(API_URL.EXPORTCV, {
      params: {
        id,
      },
      responseType: "arraybuffer",
    })
    .then((response) => {
      const blob = new Blob([Buffer.from(response.data, "hex")], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "cv.docx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

export const addEmployeeToProject = (data: IAssignEmployee): Promise<AxiosResponse<string[]>> =>
  instance.post(API_URL.ADD_EMPLOYEE, data);

export const unassignEmployeeToProject = (id: string) =>
  instance.delete(`${API_URL.UNASSIGN_EMPLOYEE}/${id}`);

export const getUserById = (id: string): Promise<AxiosResponse<GetUserById>> =>
  instance.get(`${API_URL.USERS}/${id}`);

export const uploadAvatar = (file: any): Promise<AxiosResponse<{ url: string }>> =>
  instance.post(API_URL.FILE, file, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateUser = (id: string, params: IUpdateUser): Promise<AxiosResponse<IUpdateUser>> =>
  instance.patch(`${API_URL.USERS}/${id}`, params);

export const postLanguage = (
  params: languageMember,
): Promise<AxiosResponse<{ user: languageMemberAdd }>> =>
  instance.post(API_URL.LANGUAGE_MEMBER, params);

export const deleteLanguage = (id: string): Promise<AxiosResponse<languageMember>> =>
  instance.delete(`${API_URL.LANGUAGE_MEMBER}/${id}`);

export const postTechnical = (
  params: technicalMember,
): Promise<AxiosResponse<{ user: technicalMemberAdd }>> =>
  instance.post(API_URL.TECHNICAL_MEMBER, params);

export const deleteTechnical = (id: string): Promise<AxiosResponse<technicalMember>> =>
  instance.delete(`${API_URL.TECHNICAL_MEMBER}/${id}`);
export const getCountUser = (): Promise<AxiosResponse<IGetCountUsers>> =>
  instance.get(API_URL.COUNT_USER);
