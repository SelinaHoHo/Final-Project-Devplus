import {
  createTechnical,
  deleteTechnical,
  getAllTechnical,
  getTechnicalsPagi,
  updateTechnical,
} from "@/apis/technical.api";
import { QUERY_KEY } from "@/constants/queryKey";
import ISkill, {
  GetListSkills,
  ISkillCreate,
  ISkillPagination,
  ISkills,
} from "@/interfaces/skill/skills.interface";
import { UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";

export const useGetTechnicals = (param: GetListSkills): UseQueryResult<ISkillPagination, Error> => {
  return useQuery<ISkillPagination>({
    queryKey: [QUERY_KEY.TECHNICALS, param.page, param.take],
    queryFn: async (): Promise<ISkillPagination> => {
      const { data } = await getTechnicalsPagi(param);
      return data;
    },
  });
};

export const useCreateTechnical = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: ISkillCreate) => {
      const { data } = await createTechnical(req);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TECHNICALS],
      });
      notification.success({
        message: t("SKILL.SUCCESS") as string,
        description: t("SKILL.CREATE_SUCCESS_TECH") as string,
      });
    },
    onError: (res) => {
      notification.error({
        message: t("SKILL.FAILED") as string,
        description:
          (t("SKILL.CREATE_FAILED_TECH") as string) || (t(`SKILL.${res.message}`) as string),
      });
    },
  });
};

export const useGetTechnical = (): UseQueryResult<ISkills, Error> => {
  return useQuery<ISkills>({
    queryKey: [QUERY_KEY.TECHNICALS],
    queryFn: async (): Promise<ISkills> => {
      const { data } = await getAllTechnical();
      return data;
    },
  });
};

export const useUpdateTechnical = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: ISkill) => {
      const { data } = await updateTechnical(req);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TECHNICALS],
      });
      notification.success({
        message: t("SKILL.SUCCESS") as string,
        description: t("SKILL.UPDATE_SUCCESS_TECH") as string,
      });
    },
    onError: () => {
      notification.error({
        message: t("SKILL.FAILED") as string,
        description: t("SKILL.UPDATE_FAILED_TECH") as string,
      });
    },
  });
};

export const useDeleteTechnical = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await deleteTechnical(id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TECHNICALS],
      });
      notification.success({
        message: t("SKILL.SUCCESS") as string,
        description: t("SKILL.DELETE_SUCCESS_TECH") as string,
      });
    },
    onError: () => {
      notification.error({
        message: t("SKILL.FAILED") as string,
        description: t("SKILL.DELETE_FAILED_TECH") as string,
      });
    },
  });
};
