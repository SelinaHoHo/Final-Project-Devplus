import {
  createPosition,
  deletePosition,
  getAllPosition,
  getPositionsPagi,
  updatePosition,
} from "@/apis/position.api";
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

export const useGetPositions = (param: GetListSkills): UseQueryResult<ISkillPagination, Error> => {
  return useQuery<ISkillPagination>({
    queryKey: [QUERY_KEY.POSITIONS, param.page, param.take],
    queryFn: async (): Promise<ISkillPagination> => {
      const { data } = await getPositionsPagi(param);
      return data;
    },
  });
};

export const useCreatePosition = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: ISkillCreate) => {
      const { data } = await createPosition(req);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POSITIONS],
      });
      notification.success({
        message: t("SKILL.SUCCESS") as string,
        description: t("SKILL.CREATE_SUCCESS_POSITION") as string,
      });
    },
    onError: (res) => {
      notification.error({
        message: t("SKILL.FAILED") as string,
        description:
          (t("SKILL.CREATE_FAILED_POSITION") as string) || (t(`SKILL.${res.message}`) as string),
      });
    },
  });
};

export const useGetPosition = (): UseQueryResult<ISkills, Error> => {
  return useQuery<ISkills>({
    queryKey: [QUERY_KEY.POSITIONS],
    queryFn: async (): Promise<ISkills> => {
      const { data } = await getAllPosition();
      return data;
    },
  });
};

export const useUpdatePosition = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: ISkill) => {
      const { data } = await updatePosition(req);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POSITIONS],
      });
      notification.success({
        message: t("SKILL.SUCCESS") as string,
        description: t("SKILL.UPDATE_SUCCESS_POSITION") as string,
      });
    },
    onError: () => {
      notification.error({
        message: t("SKILL.FAILED") as string,
        description: t("SKILL.UPDATE_FAILED_POSITION") as string,
      });
    },
  });
};

export const useDeletePosition = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await deletePosition(id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POSITIONS],
      });
      notification.success({
        message: t("SKILL.SUCCESS") as string,
        description: t("SKILL.DELETE_SUCCESS_POSITION") as string,
      });
    },
    onError: () => {
      notification.error({
        message: t("SKILL.FAILED") as string,
        description: t("SKILL.DELETE_FAILED_POSITION") as string,
      });
    },
  });
};
