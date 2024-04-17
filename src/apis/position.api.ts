import instance from "@/config/axios";
import { API_URL } from "@/constants/apiUrl";
import { IPositions } from "@/interfaces/position/positions.interface";
import { AxiosResponse } from "axios";

export const getAllPosition = (): Promise<AxiosResponse<IPositions>> =>
  instance.get(API_URL.POSITION);
