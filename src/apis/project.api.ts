import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import {
  GetListProject,
  IAssignEmployee,
  ICreateProjectReq,
  IProject,
  IProjectDetail,
  IUpdateProject,
  UpdateStatus,
} from "@/interfaces/project/projects.interface";
import { AxiosResponse } from "axios";

export const createProject = (data: ICreateProjectReq) => instance.post(API_URL.PROJECT, data);

export const getProjects = (param: GetListProject): Promise<AxiosResponse<IProject>> =>
  instance.get(API_URL.PROJECTS, { params: param });

export const patchUpdateStatus = (param: UpdateStatus): Promise<AxiosResponse<IProject>> =>
  instance.patch(`${API_URL.PROJECTS}/${param.id}`, param);

export const getDetailProject = (id: string): Promise<AxiosResponse<IProjectDetail>> =>
  instance.get(`${API_URL.PROJECT}/${id}`);

export const deleteProject = (id: string) => instance.delete(`${API_URL.PROJECTS}/${id}`);

export const patchUpdateProject = (
  id: string,
  data: IUpdateProject,
): Promise<AxiosResponse<IUpdateProject>> => instance.patch(`${API_URL.PROJECT}/${id}`, data);

export const addEmployeeToProject = (data: IAssignEmployee): Promise<AxiosResponse<string[]>> =>
  instance.post(API_URL.ADD_EMPLOYEE, data);

export const unassignEmployeeToProject = (id: string) =>
  instance.delete(`${API_URL.UNASSIGN_EMPLOYEE}/${id}`);
