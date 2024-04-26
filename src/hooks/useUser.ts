import {
  addEmployeeToProject,
  deleteLanguage,
  deleteTechnical,
  deleteUser,
  exportCv,
  getAllUserNoPagination,
  getDetailEmoloyee,
  getUserById,
  getUsers,
  postLanguage,
  postTechnical,
  unassignEmployeeToProject,
  updateUser,
  uploadAvatar,
} from "@/apis/user.api";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  DeleteUser,
  GetListUsers,
  GetUserById,
  IAssignEmployee,
  IGetUsers,
  IUpdateUser,
  IUserDetail,
  IUsers,
  languageMember,
  technicalMember,
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

export const useGetUserById = (id: string): UseQueryResult<GetUserById, Error> => {
  return useQuery<GetUserById>({
    queryKey: [QUERY_KEY.USERS, id],
    queryFn: async (): Promise<GetUserById> => {
      const { data } = await getUserById(id);
      return data;
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: FormData) => {
      const url = await uploadAvatar(file);
      return url.data;
    },
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FILE],
      });
      notification.success({
        message: t("UPDATE_EMPLOYEE.SUCCESS") as string,
      });
    },
    onError: () => {
      notification.error({
        message: t("UPDATE_EMPLOYEE.FAILED") as string,
        description: t("UPDATE_EMPLOYEE.FAILED_MESSAGE") as string,
      });
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

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: IUpdateUser) => {
      const data = await updateUser(id, params);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USERS],
      });
      notification.success({
        message: t("UPDATE_EMPLOYEE.SUCCESS_USER"),
      });
    },
    onError: () => {
      notification.error({
        message: t("UPDATE_EMPLOYEE.FAILED") as string,
        description: t("UPDATE_EMPLOYEE.USER_FAILED_MESSAGE") as string,
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

export const usePostLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: languageMember) => {
      const data = await postLanguage(params);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USERS, data.data.user.id],
      });
      notification.success({
        message: t("UPDATE_EMPLOYEE.POST_LANGUAGE_SUCCESS"),
      });
    },
    onError: () => {
      notification.error({
        message: t("UPDATE_EMPLOYEE.FAILED"),
        description: t("UPDATE_EMPLOYEE.LANGUAGE_DESCRIPTION"),
      });
    },
  });
};

export const useDeleteLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await deleteLanguage(id);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USERS, data.data.id],
      });
      notification.success({
        message: t("UPDATE_EMPLOYEE.LANGUAGE_SUCCESS") as string,
      });
    },
    onError: () => {
      notification.error({
        message: t("UPDATE_EMPLOYEE.FAILED") as string,
        description: t("UPDATE_EMPLOYEE.LANGUAGE_FAILED_MESSAGE") as string,
      });
    },
  });
};

export const usePostTechnical = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: technicalMember) => {
      const data = await postTechnical(params);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USERS, data.data.user.id],
      });
      notification.success({
        message: t("UPDATE_EMPLOYEE.POST_TECHNICAL_SUCCESS"),
      });
    },
    onError: () => {
      notification.error({
        message: t("UPDATE_EMPLOYEE.FAILED"),
        description: t("UPDATE_EMPLOYEE.TECHNICAL_DESCRIPTION"),
      });
    },
  });
};

export const useDeleteTechnical = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await deleteTechnical(id);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USERS, data.data.id],
      });
      notification.success({
        message: t("UPDATE_EMPLOYEE.DELETE_TECHNICAL_SUCCESS") as string,
      });
    },
    onError: () => {
      notification.error({
        message: t("UPDATE_EMPLOYEE.FAILED") as string,
        description: t("UPDATE_EMPLOYEE.TECHNICAL_FAILED_MESSAGE") as string,
      });
    },
  });
};
