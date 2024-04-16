import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import { ITechnicals } from "@/interfaces/technical/technicals.interface";
import { AxiosResponse } from "axios";

export const getAllTechnical = (): Promise<AxiosResponse<ITechnicals>> =>
  instance.get(API_URL.TECHNICAL);
