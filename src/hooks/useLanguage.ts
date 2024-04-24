import {
  createLanguage,
  deleteLanguage,
  getAllLanguage,
  updateLanguage,
} from "@/apis/language.api";
import { QUERY_KEY } from "@/constants/queryKey";
import ISkill, { ISkillCreate, ISkills } from "@/interfaces/skill/skills.interface";
import { UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";

export const useCreateLanguage = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: ISkillCreate) => {
      const { data } = await createLanguage(req);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LANGUAGES],
      });
      notification.success({
        message: t("SKILL.SUCCESS") as string,
        description: t("SKILL.CREATE_SUCCESS_LANG") as string,
      });
    },
    onError: (res) => {
      notification.error({
        message: t("SKILL.FAILED") as string,
        description:
          (t("SKILL.CREATE_FAILED_LANG") as string) || (t(`SKILL.${res.message}`) as string),
      });
    },
  });
};

export const useGetLanguage = (): UseQueryResult<ISkills, Error> => {
  return useQuery<ISkills>({
    queryKey: [QUERY_KEY.LANGUAGES],
    queryFn: async (): Promise<ISkills> => {
      const { data } = await getAllLanguage();
      return data;
    },
  });
};

export const useUpdateLanguage = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: ISkill) => {
      const { data } = await updateLanguage(req);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LANGUAGES],
      });
      notification.success({
        message: t("SKILL.SUCCESS") as string,
        description: t("SKILL.UPDATE_SUCCESS_LANG") as string,
      });
    },
    onError: () => {
      notification.error({
        message: t("SKILL.FAILED") as string,
        description: t("SKILL.UPDATE_FAILED_LANG") as string,
      });
    },
  });
};

export const useDeleteLanguage = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await deleteLanguage(id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LANGUAGES],
      });
      notification.success({
        message: t("SKILL.SUCCESS") as string,
        description: t("SKILL.DELETE_SUCCESS_LANG") as string,
      });
    },
    onError: () => {
      notification.error({
        message: t("SKILL.FAILED") as string,
        description: t("SKILL.DELETE_FAILED_LANG") as string,
      });
    },
  });
};
