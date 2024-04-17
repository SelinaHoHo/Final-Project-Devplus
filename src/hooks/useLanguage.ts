import { getAllLanguage } from "@/apis/language.api";
import { QUERY_KEY } from "@/constants/queryKey";
import { ILanguages } from "@/interfaces/language/languages.interface";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const useGetLanguage = (): UseQueryResult<ILanguages, Error> => {
  return useQuery<ILanguages>({
    queryKey: [QUERY_KEY.LANGGUAGES],
    queryFn: async (): Promise<ILanguages> => {
      const { data } = await getAllLanguage();
      return data;
    },
  });
};
