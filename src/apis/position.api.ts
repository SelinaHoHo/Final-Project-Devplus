import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import ISkill, { ISkillCreate, ISkills } from "@/interfaces/skill/skills.interface";

import { AxiosResponse } from "axios";

export const createPosition = (data: ISkillCreate) => instance.post(API_URL.POSITION, data);

export const getAllPosition = (): Promise<AxiosResponse<ISkills>> => instance.get(API_URL.POSITION);

export const updatePosition = (data: ISkill): Promise<AxiosResponse<ISkill>> =>
  instance.patch(`${API_URL.POSITION}/${data?.id}`, data);

export const deletePosition = (id: string) => instance.delete(`${API_URL.POSITION}/${id}`);
