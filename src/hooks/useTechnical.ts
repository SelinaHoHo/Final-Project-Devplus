import {
  createTechnical,
  deleteTechnical,
  getAllTechnical,
  getTechnical,
  updateTechnical,
} from "@/apis/technical.api";
import { QUERY_KEY } from "@/constants/queryKey";
import ITechnical, {
  ITechnicalCreate,
  ITechnicals,
} from "@/interfaces/technical/technicals.interface";
import { UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";

export const useCreateTechnical = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: ITechnicalCreate) => {
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

export const useGetTechnical = (): UseQueryResult<ITechnicals, Error> => {
  return useQuery<ITechnicals>({
    queryKey: [QUERY_KEY.TECHNICALS],
    queryFn: async (): Promise<ITechnicals> => {
      const { data } = await getAllTechnical();
      return data;
    },
  });
};

export const useGetDetailTechnical = (id: string): UseQueryResult<ITechnical, Error> => {
  return useQuery<ITechnical>({
    queryKey: [QUERY_KEY.TECHNICAL, id],
    queryFn: async (): Promise<ITechnical> => {
      const { data } = await getTechnical(id);
      return data;
    },
  });
};

export const useUpdateTechnical = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: ITechnical) => {
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
