import { postLogin } from "@/apis/user.api";
import { ILoginResponse, ILoginRequest } from "@/interfaces/login/login.interface";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async (req: ILoginRequest) => {
      const { data } = await postLogin(req);
      return data;
    },
    onSuccess: (data: ILoginResponse) => {
      dispatch(login(data));
      window.localStorage.setItem("accessToken", data.access_token);
      window.localStorage.setItem("isLogin", "true");
      notification.success({
        message: "Login Successful",
        description: "You have successfully logged in.",
      });
      navigate("/");
    },
    onError: () => {
      notification.error({
        // Show error notification
        message: "Login Failed",
        description: "An error occurred during login.",
      });
    },
  });
};
