import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import { ILanguages } from "@/interfaces/language/languages.interface";
import { AxiosResponse } from "axios";

export const getAllLanguage = (): Promise<AxiosResponse<ILanguages>> =>
  instance.get(API_URL.LANGUAGE);
