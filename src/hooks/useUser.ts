import { getAllUserNoPagination, getUsers } from "@/apis/user.api";
import { QUERY_KEY } from "@/constants/queryKey";
import { IGetUsers, IUsers } from "@/interfaces/user/users.interface";
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

export const useGetAllUserNoPagination = (): UseQueryResult<IGetUsers, Error> => {
  return useQuery<IGetUsers>({
    queryKey: [QUERY_KEY.USERS],
    queryFn: async (): Promise<IGetUsers> => {
      const { data } = await getAllUserNoPagination();
      return data;
    },
  });
};
