import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import ISkill, {
  GetListSkills,
  ISkillCreate,
  ISkillPagination,
  ISkills,
} from "@/interfaces/skill/skills.interface";
import { ICountTechnicals } from "@/interfaces/technical/technicals.interface";
import { AxiosResponse } from "axios";

export const getTechnicalsPagi = (param: GetListSkills): Promise<AxiosResponse<ISkillPagination>> =>
  instance.get(API_URL.TECHNICALPAGI, { params: param });

export const createTechnical = (data: ISkillCreate) => instance.post(API_URL.TECHNICAL, data);

export const getAllTechnical = (): Promise<AxiosResponse<ISkills>> =>
  instance.get(API_URL.TECHNICAL);

export const updateTechnical = (data: ISkill): Promise<AxiosResponse<ISkill>> =>
  instance.patch(`${API_URL.TECHNICAL}/${data?.id}`, data);

export const deleteTechnical = (id: string) => instance.delete(`${API_URL.TECHNICAL}/${id}`);
export const getCountTechnical = (): Promise<AxiosResponse<ICountTechnicals>> =>
  instance.get(API_URL.TECHNICAL_COUNT);
