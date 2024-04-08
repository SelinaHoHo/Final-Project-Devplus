import { getUsers } from "@/apis/user.api";
import { QUERY_KEY } from "@/constants/queryKey";
import { IUsers } from "@/interfaces/user/users.interface";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const useGetAccounts = (): UseQueryResult<IUsers, Error> => {
  return useQuery<IUsers>({
    queryKey: [QUERY_KEY.USERS],
    queryFn: async (): Promise<IUsers> => {
      const { data } = await getUsers();
      return data;
    },
  });
};
