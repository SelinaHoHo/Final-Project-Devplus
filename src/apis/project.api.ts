import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import { ICreateProjectReq } from "@/interfaces/project/projects.interface";

export const createProject = (data: ICreateProjectReq) => instance.post(API_URL.PROJECT, data);
