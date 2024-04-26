import {
  addEmployeeToProject,
  createProject,
  deleteProject,
  getDetailProject,
  getOnlyProject,
  getProjects,
  patchUpdateProject,
  patchUpdateStatus,
  unassignEmployeeToProject,
} from "@/apis/project.api";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  GetListProject,
  IAssignEmployee,
  ICreateProjectReq,
  IOnlyProject,
  IProject,
  IProjectDetail,
  IUpdateProject,
  UpdateStatus,
} from "@/interfaces/project/projects.interface";
import { UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useCreateProject = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (req: ICreateProjectReq) => {
      const { data } = await createProject(req);
      return data;
    },
    onSuccess: () => {
      notification.success({
        message: t("UPDATE_PROJECT.SUCCESS") as string,
        description: t("CREATE_PROJECT.SUCCESS_MESSAGE") as string,
      });
      navigate("/projects");
    },
    onError: (res) => {
      notification.error({
        message: t("UPDATE_PROJECT.FAILED") as string,
        description: t(`CREATE_PROJECT.${res.message}`) as string,
      });
    },
  });
};

export const useGetProjects = (param: GetListProject): UseQueryResult<IProject, Error> => {
  return useQuery<IProject>({
    queryKey: [QUERY_KEY.PROJECTS, param.page, param.take],
    queryFn: async (): Promise<IProject> => {
      const { data } = await getProjects(param);
      return data;
    },
  });
};

export const useGetDetailProject = (id: string): UseQueryResult<IProjectDetail, Error> => {
  return useQuery<IProjectDetail>({
    queryKey: [QUERY_KEY.PROJECT, id],
    queryFn: async (): Promise<IProjectDetail> => {
      const { data } = await getDetailProject(id);
      return data;
    },
  });
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (param: UpdateStatus) => {
      const data = await patchUpdateStatus(param);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.PROJECTS],
      });
      notification.success({
        message: t("UPDATE.SUCCESS") as string,
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await deleteProject(id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.PROJECTS],
      });
      notification.success({
        message: t("PROJECT.SUCCESS") as string,
      });
    },
    onError: () => {
      notification.error({
        message: t("PROJECT.FAILED") as string,
        description: t("PROJECT.FAILED_DELETE") as string,
      });
    },
  });
};

export const useUpdateProject = (id: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: IUpdateProject) => {
      const { data } = await patchUpdateProject(id, req);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.UPDATEPROJECT],
      });
      notification.success({
        message: t("UPDATE_PROJECT.SUCCESS") as string,
        description: t("UPDATE_PROJECT.SUCCESS_MESSAGE") as string,
      });
      navigate("/projects");
    },
    onError: () => {
      notification.error({
        message: t("UPDATE_PROJECT.FAILED") as string,
        description: t("UPDATE_PROJECT.FAILED_MESSAGE") as string,
      });
    },
  });
};

export const useAddEmployeeToProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: IAssignEmployee) => {
      const { data } = await addEmployeeToProject(req);
      return data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEY.PROJECT],
      });
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

export const useUnAssignEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await unassignEmployeeToProject(id);
      return data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEY.PROJECT],
      });
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
export const useOnlyGetProjects = (): UseQueryResult<IOnlyProject, Error> => {
  return useQuery<IOnlyProject>({
    queryKey: [QUERY_KEY.ONLY_PROJECT],
    queryFn: async (): Promise<IOnlyProject> => {
      const { data } = await getOnlyProject();
      return data;
    },
  });
};
