import { createProject } from "@/apis/project.api";
import { ICreateProjectReq } from "@/interfaces/project/projects.interface";
import { useMutation } from "@tanstack/react-query";
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
