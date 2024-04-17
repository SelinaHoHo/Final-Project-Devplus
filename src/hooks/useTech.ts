import { getTechnologies } from "@/apis/user.api";
import { QUERY_KEY } from "@/constants/queryKey";
import { ITechnology } from "@/interfaces/tech/tech.interface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetTechs = (): UseQueryResult<ITechnology[], Error> => {
  return useQuery<ITechnology[]>({
    queryKey: [QUERY_KEY.TECH],
    queryFn: async (): Promise<ITechnology[]> => {
      const { data } = await getTechnologies();
      return data;
    },
  });
};
