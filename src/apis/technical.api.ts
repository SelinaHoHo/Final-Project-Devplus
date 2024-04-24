import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import ISkill, { ISkillCreate, ISkills } from "@/interfaces/skill/skills.interface";
import { AxiosResponse } from "axios";

export const createTechnical = (data: ISkillCreate) => instance.post(API_URL.TECHNICAL, data);

export const getAllTechnical = (): Promise<AxiosResponse<ISkills>> =>
  instance.get(API_URL.TECHNICAL);

export const updateTechnical = (data: ISkill): Promise<AxiosResponse<ISkill>> =>
  instance.patch(`${API_URL.TECHNICAL}/${data?.id}`, data);

export const deleteTechnical = (id: string) => instance.delete(`${API_URL.TECHNICAL}/${id}`);
