import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import ISkill, {
  GetListSkills,
  ISkillCreate,
  ISkillPagination,
  ISkills,
} from "@/interfaces/skill/skills.interface";
import { AxiosResponse } from "axios";
import { ICountLanguages } from "@/interfaces/language/languages.interface";

export const getLanguagesPagi = (param: GetListSkills): Promise<AxiosResponse<ISkillPagination>> =>
  instance.get(API_URL.LANGUAGEPAGI, { params: param });

export const createLanguage = (data: ISkillCreate) => instance.post(API_URL.LANGUAGE, data);

export const getAllLanguage = (): Promise<AxiosResponse<ISkills>> => instance.get(API_URL.LANGUAGE);

export const updateLanguage = (data: ISkill): Promise<AxiosResponse<ISkill>> =>
  instance.patch(`${API_URL.LANGUAGE}/${data?.id}`, data);

export const deleteLanguage = (id: string) => instance.delete(`${API_URL.LANGUAGE}/${id}`);

export const getCountLanguage = (): Promise<AxiosResponse<ICountLanguages>> =>
  instance.get(API_URL.LANGUAGE_COUNT);
