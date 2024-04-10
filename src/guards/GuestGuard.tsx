import { RootState } from "@/redux/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestGuard = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  if (isAuth) return <Navigate to='/' />;

  return <>{children}</>;
};

export default GuestGuard;
