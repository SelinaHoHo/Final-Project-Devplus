import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import {
  GetListProject,
  ICreateProjectReq,
  IProject,
} from "@/interfaces/project/projects.interface";
import { AxiosResponse } from "axios";

export const createProject = (data: ICreateProjectReq) => instance.post(API_URL.PROJECT, data);

export const getProjects = (param: GetListProject): Promise<AxiosResponse<IProject>> =>
  instance.get(API_URL.PROJECTS, { params: param });
