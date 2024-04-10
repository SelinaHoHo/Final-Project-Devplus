import { postLogin } from "@/apis/user.api";
import { ILoginRequest, ILoginResponse } from "@/interfaces/login/login.interface";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/features/auth/authSlice";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: async (req: ILoginRequest) => {
      const { data } = await postLogin(req);
      return data;
    },
    onSuccess: (data: ILoginResponse) => {
      dispatch(login(data));
      window.localStorage.setItem("accessToken", data.access_token);
      notification.success({
        message: t("LOGIN.SUCCESS") as string,
        description: t("LOGIN.SUCCESS_MESSAGE") as string,
      });
      navigate("/");
    },
    onError: () => {
      notification.error({
        // Show error notification
        message: t("LOGIN.FAILED") as string,
        description: t("LOGIN.FAILED_MESSAGE") as string,
      });
    },
  });
};
