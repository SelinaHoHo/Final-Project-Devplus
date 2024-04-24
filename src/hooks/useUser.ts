import {
  deleteUser,
  exportCv,
  getAllUserNoPagination,
  getDetailEmoloyee,
  getUsers,
} from "@/apis/user.api";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  DeleteUser,
  GetListUsers,
  IGetUsers,
  IUserDetail,
  IUsers,
} from "@/interfaces/user/users.interface";
import { UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { t } from "i18next";

export const useGetAccounts = (param: GetListUsers): UseQueryResult<IUsers, Error> => {
  return useQuery<IUsers>({
    queryKey: [QUERY_KEY.USERS, param.page, param.take],
    queryFn: async (): Promise<IUsers> => {
      const { data } = await getUsers(param);
      return data;
    },
  });
};

export const useGetAllUserNoPagination = (): UseQueryResult<IGetUsers, Error> => {
  return useQuery<IGetUsers>({
    queryKey: [QUERY_KEY.USERS_NO_PAGINATE],
    queryFn: async (): Promise<IGetUsers> => {
      const { data } = await getAllUserNoPagination();
      return data;
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (param: DeleteUser) => {
      const data = await deleteUser(param);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USERS],
      });
      notification.success({
        message: t("DELETE_USER.SUCCESS") as string,
      });
    },
    onError: () => {
      notification.error({
        message: t("DELETE_USER.FAILED") as string,
        description: t("DELETE_USER.FAILED_MESSAGE") as string,
      });
    },
  });
};

export const useGetDetailEmployee = (id: string): UseQueryResult<IUserDetail, Error> => {
  return useQuery<IUserDetail>({
    queryKey: [QUERY_KEY.USERS, id],
    queryFn: async (): Promise<IUserDetail> => {
      const { data } = await getDetailEmoloyee(id);
      return data;
    },
  });
};

export const useGetCv = () => {
  return useMutation({
    mutationFn: async (id: string) => await exportCv(id),

    onError: () => {
      notification.error({
        message: t("SKILL.FAILED") as string,
        description: t("SKILL.FAILED_CV") as string,
      });
    },
  });
};
