import { getAllPosition } from "@/apis/position.api";
import { QUERY_KEY } from "@/constants/queryKey";
import { IPositions } from "@/interfaces/position/positions.interface";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const useGetPosition = (): UseQueryResult<IPositions, Error> => {
  return useQuery<IPositions>({
    queryKey: [QUERY_KEY.POSITION],
    queryFn: async (): Promise<IPositions> => {
      const { data } = await getAllPosition();
      return data;
    },
  });
};
