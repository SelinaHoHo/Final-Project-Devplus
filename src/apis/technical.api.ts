import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import ITechnical, {
  IGetTechnicals,
  ITechnicalCreate,
} from "@/interfaces/technical/technicals.interface";
import { AxiosResponse } from "axios";

export const createTechnical = (data: ITechnicalCreate) => instance.post(API_URL.TECHNICAL, data);

export const getAllTechnical = (): Promise<AxiosResponse<IGetTechnicals>> =>
  instance.get(API_URL.TECHNICAL);

export const getTechnical = (id: string): Promise<AxiosResponse<ITechnical>> =>
  instance.get(`${API_URL.TECHNICAL}/${id}`);

export const updateTechnical = (data: ITechnical): Promise<AxiosResponse<ITechnical>> =>
  instance.patch(`${API_URL.TECHNICAL}/${data?.id}`, data);

export const deleteTechnical = (id: string) => instance.delete(`${API_URL.TECHNICAL}/${id}`);
