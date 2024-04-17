import { getLanguages } from "@/apis/user.api";
import { QUERY_KEY } from "@/constants/queryKey";
import { ILanguage } from "@/interfaces/langs/langs.interface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetLangs = (): UseQueryResult<ILanguage[], Error> => {
  return useQuery<ILanguage[]>({
    queryKey: [QUERY_KEY.LANG],
    queryFn: async (): Promise<ILanguage[]> => {
      const { data } = await getLanguages();
      return data;
    },
  });
};
