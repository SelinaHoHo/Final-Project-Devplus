/* eslint-disable react-hooks/exhaustive-deps */
import { setUserItem } from "@/redux/features/auth/authSlice";
import { setGlobalState } from "@/redux/features/global/globalSlice";
import { jwtDecode } from "jwt-decode";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return dispatch(
          setGlobalState({
            loading: true,
          }),
        );
      }

      try {
        const data = jwtDecode<{ username: string; id: string; email: string; role: string }>(
          accessToken,
        );

        dispatch(
          setUserItem({
            isAuth: true,
            user: { ...data },
          }),
        );
      } catch (_error) {
        dispatch(
          setUserItem({
            isAuth: false,
          }),
        );
      }
    })();
  }, []);

  return <>{children}</>;
};
