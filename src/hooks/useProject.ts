import { createProject, getProjects, patchUpdateStatus } from "@/apis/project.api";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  GetListProject,
  ICreateProjectReq,
  IProject,
  UpdateStatus,
} from "@/interfaces/project/projects.interface";
import { UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
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
        message: t("CREATE_PROJECT.SUCCESS") as string,
        description: t("CREATE_PROJECT.SUCCESS_MESSAGE") as string,
      });
      navigate("/projects");
    },
    onError: (res) => {
      notification.error({
        message: t("CREATE_PROJECT.FAILED") as string,
        description: t(`CREATE_PROJECT.${res.message}`) as string,
      });
    },
  });
};

export const useGetProjects = (param: GetListProject): UseQueryResult<IProject, Error> => {
  return useQuery<IProject>({
    queryKey: [QUERY_KEY.PROJECTS],
    queryFn: async (): Promise<IProject> => {
      const { data } = await getProjects(param);
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
    },
  });
};
