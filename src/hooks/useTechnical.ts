import { getAllTechnical } from "@/apis/technical.api";
import { QUERY_KEY } from "@/constants/queryKey";
import { ITechnicals } from "@/interfaces/technical/technicals.interface";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const useGetTechnical = (): UseQueryResult<ITechnicals, Error> => {
  return useQuery<ITechnicals>({
    queryKey: [QUERY_KEY.TECHNICALS],
    queryFn: async (): Promise<ITechnicals> => {
      const { data } = await getAllTechnical();
      return data;
    },
  });
};
