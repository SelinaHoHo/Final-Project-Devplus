import {
  addEmployeeToProject,
  deleteUser,
  getAllUserNoPagination,
  getDetailEmoloyee,
  getUsers,
  unassignEmployeeToProject,
} from "@/apis/user.api";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  DeleteUser,
  GetListUsers,
  IAssignEmployee,
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

export const useAddEmployeeToProject = () => {
  return useMutation({
    mutationFn: async (req: IAssignEmployee) => {
      const { data } = await addEmployeeToProject(req);
      return data;
    },
    onSuccess: () => {
      notification.success({
        message: t("UPDATE_PROJECT.SUCCESS") as string,
        description: t("UPDATE_PROJECT.ADDEMPLOYEE_SUCCESS_MESSAGE") as string,
      });
    },
    onError: () => {
      notification.error({
        message: t("UPDATE_PROJECT.FAILED") as string,
        description: t("UPDATE_PROJECT.ADDEMPLOYEE_FAILED_MESSAGE") as string,
      });
    },
  });
};

export const useUnAssignEmployee = (id: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await unassignEmployeeToProject(id);
      return data;
    },
    onSuccess: () => {
      notification.success({
        message: t("UPDATE_PROJECT.SUCCESS") as string,
        description: t("UPDATE_PROJECT.UNASSIGNEMPLOYEE_SUCCESS_MESSAGE") as string,
      });
    },
    onError: () => {
      notification.error({
        message: t("UPDATE_PROJECT.FAILED") as string,
        description: t("UPDATE_PROJECT.UNASSIGNEMPLOYEE_FAILED_MESSAGE") as string,
      });
    },
  });
};
