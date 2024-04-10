import { setUserItem } from "@/redux/features/auth/authSlice";
import { setGlobalState } from "@/redux/features/global/globalSlice";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        return dispatch(
          setGlobalState({
            loading: true,
          }),
        );
      }

      try {
        const user = { id: "1", email: "admin@gmail.com", role: "admin", name: "a" };
        dispatch(
          setUserItem({
            isAuth: true,
            user,
            role: "admin",
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
