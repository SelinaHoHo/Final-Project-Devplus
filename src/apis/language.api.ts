import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import ISkill, { ISkillCreate, ISkills } from "@/interfaces/skill/skills.interface";
import { AxiosResponse } from "axios";

export const createLanguage = (data: ISkillCreate) => instance.post(API_URL.LANGUAGE, data);

export const getAllLanguage = (): Promise<AxiosResponse<ISkills>> => instance.get(API_URL.LANGUAGE);

export const updateLanguage = (data: ISkill): Promise<AxiosResponse<ISkill>> =>
  instance.patch(`${API_URL.LANGUAGE}/${data?.id}`, data);

export const deleteLanguage = (id: string) => instance.delete(`${API_URL.LANGUAGE}/${id}`);
